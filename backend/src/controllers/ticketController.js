const Ticket = require('../models/ticketModel');
const axios = require('axios');
const { assignAgent } = require('../services/ticketAssignmentService');
const Agent = require('../models/agentModel')
const Attachment = require('../models/attachmentsModel');
const { getPresignedUrl } = require('../services/generatePresignedUrls')

exports.createTicket = async (req, res) => {
    try {
        console.log("req body in ticket controller - ",req.body)
      // Step 1: Create the ticket object without agentId
      const ticket = new Ticket({
        ...req.body,
        agentId: undefined  // Explicitly set agentId as undefined at first
      });
  
      // Step 2: Automatically assign an agent only if the ticket is not manually assigned
      if (!ticket.assignedByManager) {
        const assignedAgentId = await assignAgent(ticket.categoryName);
        ticket.agentId = assignedAgentId;
      }
  
      // Step 3: Save the ticket with the agentId to get the ticketId
      const savedTicket = await ticket.save();
  
      // Step 4: Handle file uploads only after saving the ticket
      if (req.files && req.files.length > 0) {
        const attachments = req.files.map(file => ({
          ticketId: savedTicket.ticketId,   // Use the saved ticketId here
          fileUrl: file.location,           // S3 file URL
          fileType: file.mimetype,
          fileSize :file.size,
          categoryName: savedTicket.categoryName

        }));
  
        // Save the attachments in the attachments collection
        const savedAttachments = await Attachment.insertMany(attachments);
  
        // Update the ticket with the attachment references
        savedTicket.attachmentIds = savedAttachments.map(a => a._id);
        await savedTicket.save();
      }
  
      // Step 5: Create a notification after the ticket is saved
      const notificationData = {
        userId: savedTicket.customerEmail,
        message: `A new ticket has been created with the subject: ${ticket.subject}`
      };
  
      try {
        await axios.post('http://localhost:3001/api/notifications', notificationData);
      } catch (error) {
        console.error('Error sending notification:', error.message);
      }
  
      // Send success response
      res.status(201).json({savedTicket});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Adding attachments to an existing ticket
exports.addAttachments = async (req, res) => {
    try {
      const { ticketId } = req.params;
      const ticket = await Ticket.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Handle file uploads
      if (req.files && req.files.length > 0) {
        const attachments = req.files.map(file => ({
          ticketId: ticket.ticketId,
          fileUrl: file.location,  // S3 file URL
          fileType: file.mimetype,
          categoryName:ticket.categoryName
        }));
  
        // Save attachments
        const savedAttachments = await Attachment.insertMany(attachments);
  
        // Update the ticket with the new attachments
        ticket.attachmentIds = [...ticket.attachmentIds, ...savedAttachments.map(a => a._id)];
        await ticket.save();
      }
  
      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Controller to get pre-signed URLs for ticket attachments
exports.getAttachments = async (req, res) => {
    try {
      const { ticketId } = req.params;
      const attachments = await Attachment.findOne({ ticketId });
  
      if (!attachments) {
        return res.status(404).json({ message: 'No attachments found for this ticket.' });
      }
  
      // Log the attachments to verify the result
      console.log("Attachments found:", attachments);
  
      // Check if the data is in the expected format
      if (typeof attachments !== 'object') {
        return res.status(500).json({ message: 'Attachments data is not in the correct format.' });
      }
  
      // Extract the S3 key from the fileUrl (remove the base URL)
      const s3Key = attachments.fileUrl.replace('https://customer-support-ticketing-system.s3.us-east-1.amazonaws.com/', '');
  
      // Generate pre-signed URL using the extracted S3 key
      const presignedUrl = await getPresignedUrl(s3Key);
  
      // Add the generated pre-signed URL to the attachment object (using _doc to directly update the document)
      attachments._doc.presignedUrl = presignedUrl; 
  
      res.status(200).json(attachments);
    } catch (error) {
      console.error('Error generating pre-signed URLs:', error);
      res.status(500).json({ error: error.message });
    }
  };
 

// Update ticket priority - For Managers
exports.updateTicketPriority = async (req, res) => {
    try {
        const { priority } = req.body;
        if (!['low', 'medium', 'high','urgent'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority value' });
        }

        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { priority, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket priority updated successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate the status
        if (!['open', 'in progress', 'closed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find the ticket by ID
        const ticket = await Ticket.findById(req.params.id);

        // Check if the ticket was found
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Prevent updates if the ticket is already closed
        if (ticket.status === 'closed') {
            return res.status(400).json({ message: 'Cannot update a closed ticket' });
        }

        // Ensure valid forward transitions only (open -> in progress -> closed)
        const validTransitions = {
            'open': ['in progress'],          // Can only move from 'open' to 'in progress'
            'in progress': ['closed'],        // Can only move from 'in progress' to 'closed'
        };

        // Check if the new status is a valid transition
        if (!validTransitions[ticket.status]?.includes(status)) {
            return res.status(400).json({
                message: `Invalid status transition from ${ticket.status} to ${status}`,
            });
        }

        // Update the ticket status
        ticket.status = status;
        ticket.updatedAt = Date.now();
        await ticket.save();

        // Prepare notification data
        const notificationData = {
            userId: ticket.customerEmail, // Assuming customerEmail is the identifier for the user
            message: `The status of your ticket (ID: ${ticket.ticketId}) has been updated to: ${ticket.status}.`
        };

        // Send notification
        try {
            await axios.post('http://localhost:3001/api/notifications', notificationData);
        } catch (error) {
            console.error('Error sending notification:', error.message);
        }

        // Respond with the updated ticket information
        res.status(200).json({ message: 'Ticket status updated successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTicket = async (req, res) => {
    try {
        const ticket =  await Ticket.findById(req.params.id);    
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTicketByTicketId = async (req, res) => {
  try {
      const ticket = await Ticket.findOne({ ticketId: req.params.ticketId }); // Search by ticketId
      if (!ticket) {
          return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(ticket);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


exports.getAllTickets = async (req, res) => {
  try {
      const filters = {};
      const { status, priority, category, createdDate } = req.query; // Change to createdDate

      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      if (category) filters.categoryName = category;

      // Date filtering (for createdDate)
      if (createdDate) {
          const startOfDay = new Date(createdDate);
          const endOfDay = new Date(createdDate);
          endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

          filters.created_at = {
              $gte: startOfDay,
              $lte: endOfDay
          };
      }

      const tickets = await Ticket.find(filters);
      res.json(tickets);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};




exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteTicket = async (req,res) =>{
    try{
        const ticket =  await Ticket.findByIdAndDelete(req.params.id)
        if(!ticket) return res.status(404).json({ error: 'Ticket not found' })
            res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    
    }
}

exports.assignAgentByManager = async (req, res) => {
    try {
        const { agentId } = req.body; // Get agentId from request body
        const ticketId = req.params.id;

        // Find the ticket
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Check if the agent with the given agentId exists in the Agent collection
        const agent = await Agent.findOne({ agentId });
        if (!agent) {
            return res.status(404).json({ error: `Agent with agentId ${agentId} not found` });
        }
          // Check if the agent's category matches the ticket's category
          if (agent.categoryName !== ticket.categoryName) {
            return res.status(400).json({ error: `Agent's category (${agent.categoryName}) does not match ticket's category (${ticket.categoryName})` });
        }

        // Update the ticket with the new agentId and mark as manually assigned
        ticket.agentId = agentId;
        ticket.assignedByManager = true;
        await ticket.save();

        // Optionally: Update the agent's assigned tickets or status (e.g., increase their workload count or availability status)
        // agent.assignedTickets = agent.assignedTickets ? agent.assignedTickets + 1 : 1; // Increment the number of tickets
        await agent.save(); // Save the updated agent

        res.json({ message: 'Agent successfully assigned by manager', ticket });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
