const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../services/uploadService');
// router.post('/tickets', ticketController.createTicket);

// Route for creating a ticket with optional attachments
router.post('/tickets', upload.array('files', 5), ticketController.createTicket);
// Route for adding attachments to an existing ticket
router.post('/tickets/:ticketId/attachments', upload.array('files', 5), ticketController.addAttachments);

router.get('/tickets/:id', ticketController.getTicket);
router.get('/tickets', ticketController.getAllTickets);
router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicket);
// routes/ticketRoutes.js

router.put('/tickets/:id/assign', authMiddleware, roleMiddleware('manager'), ticketController.assignAgentByManager);


module.exports = router;
