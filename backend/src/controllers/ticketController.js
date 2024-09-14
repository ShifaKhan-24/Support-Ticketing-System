const Ticket = require('../models/ticketModel');
const axios = require('axios');
const { assignAgent } = require('../services/ticketAssignmentService');
const Agent = require('../models/agentModel')




exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket({
            ...req.body,
            agentId: undefined  // Explicitly set agentId as undefined at first
        });

        // Automatically assign an agent only if the ticket is not manually assigned
        if (!ticket.assignedByManager) {
            const assignedAgentId = await assignAgent(ticket.categoryName);
            ticket.agentId = assignedAgentId;
        }

        await ticket.save();

    
        const notificationData = {
            userId: ticket.customerEmail,
            message: `A new ticket has been created with the subject: ${ticket.subject}`
        };

        try {
            await axios.post('http://localhost:3000/api/notifications', notificationData);
        } catch (error) {
            console.error('Error sending notification:', error.message);
        }

        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
// controllers/ticketController.js

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
};
