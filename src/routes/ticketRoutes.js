const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API for managing tickets
 */

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example: []
 */
router.get('/tickets', ticketController.getAllTickets);

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             subject: "Sample Subject"
 *             description: "Sample Description"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               subject: "Sample Subject"
 *               description: "Sample Description"
 */
router.post('/tickets', ticketController.createTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket found
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               subject: "Sample Subject"
 *               description: "Sample Description"
 *       404:
 *         description: Ticket not found
 */
router.get('/tickets/:id', ticketController.getTicket);
router.get('/tickets/:categoryName',ticketController.getTicketByCategory)
router.delete('/tickets/:id', ticketController.deleteTicket);
module.exports = router;
