const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware =  require('../middleware/roleMiddleware')

// Agent Routes
// router.post('/agents',agentController.createAgent)
router.get('/agents', authMiddleware,roleMiddleware('manager'),agentController.getAllAgents);
router.get('/agent/category/:categoryName',authMiddleware,roleMiddleware('manager'), agentController.getAgentsByCategory);
router.put('/agent/:id', authMiddleware,roleMiddleware('manager'),agentController.updateAgent);
router.delete('/agent/:id',authMiddleware,roleMiddleware('manager'), agentController.deleteAgent);
router.get('/agent/:id/tickets',agentController.getAgentTickets);
router.get('/agent/:id/closed-tickets',agentController.getClosedTickets)
module.exports = router;

