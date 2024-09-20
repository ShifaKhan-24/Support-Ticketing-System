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
      res.status(201).json({ savedTicket, message: ` Files uploaded successfully - ${req.files.length}` });
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
      const s3Key = attachments.fileUrl.replace('https://customer-support-tickets-attachments.s3.ap-south-1.amazonaws.com/', '');
  
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

exports.getAllTickets = async (req, res) => {
    try {

        const tickets = await Ticket.find();
        
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
