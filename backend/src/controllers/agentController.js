const Agent = require('../models/agentModel');
const Ticket = require("../models/ticketModel");


// Get all agents with user details
exports.getAllAgents = async (req, res) => {
    try {
        const { availabilityStatus, categoryName } = req.query; // Get availabilityStatus and categoryName from query parameters

        // Build the query object
        const query = {};
        if (availabilityStatus && availabilityStatus !== 'all') {
            query.availabilityStatus = availabilityStatus; // Add availability filter
        }
        if (categoryName && categoryName !== 'all') {
            query.categoryName = categoryName; // Add category filter
        }

        // Fetch agents based on the query
        const agents = await Agent.find(query).populate('userId');
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getAgentById = async (req, res) => {
    try {
        const { agentId } = req.params; // Get agentId from URL parameters

        const agent = await Agent.findOne({ agentId }).populate('userId');
        
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find agent by category
exports.getAgentsByCategory = async (req, res) => {
    try {
        const agents = await Agent.find({ categoryName: req.params.categoryName }).populate('userId');
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an agent
exports.updateAgent = async (req, res) => {
    try {
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAgent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        res.json({ message: 'Agent deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAgentTickets =async (req, res) => {
    try {
        const { id } = req.params;
        const tickets = await Ticket.find({ agentId: id });
        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets assigned to this agent' });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get closed tickets assigned to an agent
exports.getClosedTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const tickets = await Ticket.find({ agentId: id, status: 'closed' });
        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets closed by this agent.' });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
