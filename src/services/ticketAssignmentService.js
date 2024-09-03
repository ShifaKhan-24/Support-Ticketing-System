// src/services/ticketAssignmentService.js

const Agent = require('../models/agentModel');

// Function to assign an agent based on category_id
const assignAgent = async (ticketCategoryId) => {
    // Find agents who match the ticket's category_id
    const agents = await Agent.find({ categoryId: ticketCategoryId });

    if (agents.length === 0) {
        throw new Error(`No agents available for category ID ${ticketCategoryId}`);
    }

    // If multiple agents are found, randomly select one
     
    const assignedAgent = agents[randomIndex];

    return assignedAgent._id; // Return the ID of the selected agent
};

module.exports = { assignAgent };
