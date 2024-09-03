// src/controllers/agentController.js

const agentService = require('../services/agentService');

// Create a new agent
const createAgent = async (req, res) => {
    try {
        const agent = await agentService.createAgent(req.body);
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all agents
const getAllAgents = async (req, res) => {
    try {
        const agents = await agentService.getAllAgents();
        res.status(200).json(agents);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get agent by ID
const getAgentById = async (req, res) => {
    try {
        const agent = await agentService.getAgentById(req.params.id);
        if (agent) {
            res.status(200).json(agent);
        } else {
            res.status(404).json({ error: 'Agent not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update agent by ID
const updateAgentById = async (req, res) => {
    try {
        const agent = await agentService.updateAgentById(req.params.id, req.body);
        if (agent) {
            res.status(200).json(agent);
        } else {
            res.status(404).json({ error: 'Agent not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete agent by ID
const deleteAgentById = async (req, res) => {
    try {
        const agent = await agentService.deleteAgentById(req.params.id);
        if (agent) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Agent not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createAgent,
    getAllAgents,
    getAgentById,
    updateAgentById,
    deleteAgentById
};
