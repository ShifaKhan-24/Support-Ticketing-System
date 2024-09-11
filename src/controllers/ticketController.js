const Ticket = require('../models/ticketModel');
const axios = require('axios');
const { assignAgent } = require('../services/ticketAssignmentService');


exports.createTicket = async (req, res) => {
    try {
        // Create the ticket object without agentId
        const ticket = new Ticket({
            ...req.body,
            agentId: undefined  // Explicitly set agentId as undefined at first
        });

        // Assign an agent based on the ticket's categoryName
        const assignedAgentId = await assignAgent(ticket.categoryName);
        
        // Now assign the selected agentId
        ticket.agentId = assignedAgentId;

        // Save the ticket with the agentId
        await ticket.save();

        // Create a notification after the ticket is saved
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

exports.getTicketByCategory = async (req,res)=>{
    try{
        const tickets = await Ticket.find({categoryName:req.params.categoryName});
        if (tickets.length === 0) return res.status(404).json({ error: 'No tickets found for this category' });
        res.json(tickets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
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
        console.log(ticket)
        if(!ticket) return res.status(404).json({ error: 'Ticket not found' })
            res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    
    }
    
}