// src/controllers/agentController.js

const Agent = require('../models/agentModel');
// const agentService = require('../services/agentService');

// Create a new agent
const createAgent = async (req, res) => {
    try {
        const agent = await agentService.createAgent(req.body);
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// // Get all agents
// const getAllAgents = async (req, res) => {
//     try {
//         const agents = await agentService.getAllAgents();
//         res.status(200).json(agents);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get agent by ID
// const getAgentById = async (req, res) => {
//     try {
//         const agent = await agentService.getAgentById(req.params.id);
//         if (agent) {
//             res.status(200).json(agent);
//         } else {
//             res.status(404).json({ error: 'Agent not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Update agent by ID
// const updateAgentById = async (req, res) => {
//     try {
//         const agent = await agentService.updateAgentById(req.params.id, req.body);
//         if (agent) {
//             res.status(200).json(agent);
//         } else {
//             res.status(404).json({ error: 'Agent not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delete agent by ID
// const deleteAgentById = async (req, res) => {
//     try {
//         const agent = await agentService.deleteAgentById(req.params.id);
//         if (agent) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ error: 'Agent not found' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// module.exports = {
//     createAgent,
//     getAllAgents,
//     getAgentById,
//     updateAgentById,
//     deleteAgentById
// };




// Get all agents with user details
exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find().populate('userId');
        res.json(agents);
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
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.agentId, req.body, { new: true });
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
