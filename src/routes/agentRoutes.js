const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.post('/agents', agentController.createAgent);
router.get('/agents', agentController.getAllAgents);
router.get('/agents/:id', agentController.getAgentById);
router.put('/agents/:id', agentController.updateAgentById);
router.delete('/agents/:id', agentController.deleteAgentById);

module.exports = router;
