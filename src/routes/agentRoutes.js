const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const userController = require('../controllers/userController')

// router.post('/agents', agentController.createAgent);
// router.get('/agents', userController.getAllAgents);
// console.log(userController.getAllAgents);
// router.get('/agents/:id', agentController.getAgentById);
// router.put('/agents/:id', agentController.updateAgentById);
// router.delete('/agents/:id', agentController.deleteAgentById);


// Agent Routes
// router.post('/agents',agentController.createAgent)
router.get('/agents', agentController.getAllAgents);
router.get('/agent/category/:categoryName', agentController.getAgentsByCategory);
router.put('/agent/:id', agentController.updateAgent);
router.delete('/agent/:id', agentController.deleteAgent);
module.exports = router;

