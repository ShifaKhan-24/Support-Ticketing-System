const Ticket = require('../models/ticketModel');
const { createNotification } = require('../controllers/notificationController'); // Import the notification controller
const axios = require('axios');
const { assignAgent } = require('../services/ticketAssignmentService');


exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        const assignedAgentId = await assignAgent(ticket.categoryId);
        ticket.agentId = assignedAgentId;
        await ticket.save();

        // Create a notification after the ticket is saved
        const notificationData = {
            userId: ticket.customerId,
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