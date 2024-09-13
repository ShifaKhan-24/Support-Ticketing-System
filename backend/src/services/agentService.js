const Agent = require('../models/agentModel');

// Create a new agent
const createAgent = async (agentData) => {
    try {
        const agent = new Agent(agentData);
        return await agent.save();
    } catch (error) {
        throw new Error(`Error creating agent: ${error.message}`);
    }
};

// Get an agent by ID
const getAgentById = async (id) => {
    try {
        return await Agent.findById(id);
    } catch (error) {
        throw new Error(`Error finding agent: ${error.message}`);
    }
};

// Get all agents
const getAllAgents = async () => {
    try {
        return await Agent.find();
    } catch (error) {
        throw new Error(`Error getting agents: ${error.message}`);
    }
};

// Update an agent by ID
const updateAgentById = async (id, updateData) => {
    try {
        return await Agent.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating agent: ${error.message}`);
    }
};

// Delete an agent by ID
const deleteAgentById = async (id) => {
    try {
        return await Agent.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting agent: ${error.message}`);
    }
};

module.exports = {
    createAgent,
    getAgentById,
    getAllAgents,
    updateAgentById,
    deleteAgentById
};
