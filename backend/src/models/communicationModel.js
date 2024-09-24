const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communicationSchema = new Schema({
  sender: { type: String, required: true }, // 'customer' or 'agent'
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  attachments: { type: [String] } // URLs or file paths to attachments
});

const Communication = mongoose.model('Communication', communicationSchema);

module.exports = communicationSchema; // Export the schema itself
