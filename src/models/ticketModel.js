const mongoose = require('mongoose');
const counterModal = require('./counter.model')

const ticketSchema = new mongoose.Schema({
  ticket_id: { type: Number, unique: true }, // Auto-incremented ticket ID
  categoryId:{type:String}, //biiling, technical, general or 1,2,3
  agentId:{type:Number},    // _id=1,2,
  status:{type:String},     // enum type - open-> in progress -> resolved -> 
  priority:{type:String},
  subject:{type:String},
  description:{type:String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  communications: {type:Array}
});

ticketSchema.pre('save', async function (next) {
  if (this.isNew) {
      console.log("New document, incrementing ticket_id...");
      try {
        const counter = await counterModal.findByIdAndUpdate(
          { _id: 'ticketId' },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        );
        this.ticket_id = counter.sequence_value;
        console.log("Generated ticket_id:", this.customer_id);
      } catch (error) {
        return next(error);
      }
    }
    this.updated_at = Date.now();
    next();
});

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;

