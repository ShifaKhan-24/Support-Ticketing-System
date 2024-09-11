const Agent = require('../models/agentModel');

const assignAgent = async (ticketCategoryName) => {
    // Find agents who match the ticket's categoryName
    const agents = await Agent.find({ categoryName: ticketCategoryName });
console.log(ticketCategoryName,categoryName);
    if (agents.length === 0) {
        throw new Error(`No agents available for category: ${ticketCategoryName}`);
    }
    
    // Randomly select one if multiple agents are found
    const randomIndex = Math.floor(Math.random() * agents.length);
    const assignedAgent = agents[randomIndex];
    
    // Log the full agent details including agentId
    console.log("Assigned agent:", assignedAgent);

    // Ensure agentId is returned
    return assignedAgent.agentId; // Return the custom agentId
};

module.exports = { assignAgent };
