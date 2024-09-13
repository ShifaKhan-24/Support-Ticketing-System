const mongoose = require('mongoose');

 const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Name of the counter, e.g., 'customerId'
    sequence_value: { type: Number, default: 0 },
  });
  
  
const Counter = mongoose.model('counters', counterSchema);

module.exports = Counter;