const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../services/uploadService');
// router.post('/tickets',authMiddleware,roleMiddleware('customer'), ticketController.createTicket);

// Route for creating a ticket with optional attachments
router.post('/tickets', upload.array('files', 5), ticketController.createTicket);
// Route for adding attachments to an existing ticket
router.post('/tickets/:ticketId/attachments', upload.array('files', 5), ticketController.addAttachments);

//Route to get pre-signed URLs for attachments of a ticket
router.get('/tickets/:ticketId/attachments', ticketController.getAttachments);
router.get('/tickets/:id', ticketController.getTicket);
router.get('/tickets', authMiddleware,roleMiddleware('manager'),ticketController.getAllTickets);
router.put('/tickets/:id', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicket);

// Update ticket priority 
router.put('/tickets/:id/priority', authMiddleware, roleMiddleware(['manager', 'agent']), ticketController.updateTicketPriority);

// Update ticket status - Agent access only
router.put('/tickets/:id/status', authMiddleware, roleMiddleware('agent'), ticketController.updateTicketStatus);

// routes/ticketRoutes.js

router.put('/tickets/:id/assign', authMiddleware, roleMiddleware('manager'), ticketController.assignAgentByManager);
router.get('/tickets/ticketId/:ticketId', authMiddleware, roleMiddleware('manager'), ticketController.getTicketByTicketId);

module.exports = router;
