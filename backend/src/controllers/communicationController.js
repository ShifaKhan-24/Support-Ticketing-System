// communicationController.js
const Ticket = require('../models/ticketModel');

exports.addCommunication = async (req, res) => {
  try {
    const { sender, message, attachments } = req.body;
    const ticketId = parseInt(req.params.ticketId, 10); // Convert to number

    const ticket = await Ticket.findOne({ ticketId }); // Use `findOne` with `ticketId`

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.communications.push({ sender, message, attachments });
    ticket.updated_at = Date.now();
    
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommunications = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.ticketId, 10); // Convert to number

    const ticket = await Ticket.findOne({ ticketId }).select('communications'); // Use `findOne` with `ticketId`
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json(ticket.communications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
