const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/tickets',authMiddleware,roleMiddleware('customer'), ticketController.createTicket);
router.get('/tickets/:id', ticketController.getTicket);
router.get('/tickets', authMiddleware,roleMiddleware('manager'),ticketController.getAllTickets);
router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicket);
// routes/ticketRoutes.js

router.put('/tickets/:id/assign', authMiddleware, roleMiddleware('manager'), ticketController.assignAgentByManager);


module.exports = router;
