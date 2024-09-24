const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware =  require('../middleware/roleMiddleware')

// Agent Routes
// router.post('/agents',agentController.createAgent)
router.get('/agents', agentController.getAllAgents);
router.get('/agents/category/:categoryName', agentController.getAgentsByCategory);
router.put('/agents/:id', agentController.updateAgent);
router.delete('/agent/:id', agentController.deleteAgent);
router.get('/agent/:id/tickets',agentController.getAgentTickets);
router.get('/agent/:id/closed-tickets',agentController.getClosedTickets)
module.exports = router;

