const Manager =  require('../models/managerModel');

exports.createManager = async (req, res) => {
    try {
      const { department } = req.body;
  
      const lastManager = await Manager.findOne().sort({ managerId: -1 });
      const newManagerId = lastManager ? lastManager.managerId + 1 : 1;
  
      const manager = new Manager({
        managerId: newManagerId,
        userId: req.user._id, // req.user._id comes from the auth middleware
        department,
      });
  
      await manager.save();
      res.status(201).json({ message: 'Manager created successfully', manager });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getAllManagers = async (req, res) => {
    try {
      const managers = await Manager.find();
      res.json(managers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getManagerById = async (req, res) => {
    try {
      const manager = await Manager.findById(req.params.id);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
      res.json(manager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateManagerById = async (req, res) => {
    try {
      const updatedManager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedManager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
      res.json(updatedManager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteManager = async (req, res) => {
    try {
      const manager = await Manager.findByIdAndDelete(req.params.id);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
      res.json({ message: 'Manager deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//   exports.assignTicket = async (req,res)=>{
//     try {
//         const { agentId } = req.body; // Get agentId from request body
//         const ticketId = req.params.id;

//         // Find the ticket
//         const ticket = await Ticket.findById(ticketId);
//         if (!ticket) {
//             return res.status(404).json({ error: 'Ticket not found' });
//         }

//         // Check if the agent with the given agentId exists in the Agent collection
//         const agent = await Agent.findOne({ agentId });
//         if (!agent) {
//             return res.status(404).json({ error: `Agent with agentId ${agentId} not found` });
//         }
//           // Check if the agent's category matches the ticket's category
//           if (agent.categoryName !== ticket.categoryName) {
//             return res.status(400).json({ error: `Agent's category (${agent.categoryName}) does not match ticket's category (${ticket.categoryName})` });
//         }

//         // Update the ticket with the new agentId and mark as manually assigned
//         ticket.agentId = agentId;
//         ticket.assignedByManager = true;
//         await ticket.save();

//         // Optionally: Update the agent's assigned tickets or status (e.g., increase their workload count or availability status)
//         // agent.assignedTickets = agent.assignedTickets ? agent.assignedTickets + 1 : 1; // Increment the number of tickets
//         await agent.save(); // Save the updated agent

//         res.json({ message: 'Agent successfully assigned by manager', ticket });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
//   }