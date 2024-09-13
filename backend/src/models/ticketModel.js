const mongoose = require('mongoose');
const counterModal = require('./counter.model')

const ticketSchema = new mongoose.Schema({
  ticketId: { type: Number, unique: true }, // Auto-incremented ticket ID
  customerId: { type: Number },
  customerEmail: { type: String, required: true },
  categoryName:{type:String, required:true, ref:'categories'}, //biiling, technical
  agentId:{type:Number},    // _id=1,2,
  status:{type:String, default: 'open'},     // enum type - open-> in progress -> resolved -> 
  priority:{type:String, default: 'low'},
  subject:{type:String,required:true},
  description:{type:String,required:true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  communications: {type:Array}
});

ticketSchema.pre('save', async function (next) {
  if (this.isNew) {
      console.log("New document, incrementing ticketId...");
      try {
        const counter = await counterModal.findByIdAndUpdate(
          { _id: 'ticketId' },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        );
        this.ticketId = counter.sequence_value;
        console.log("Generated ticketId:", this.ticketId);
      } catch (error) {
        return next(error);
      }
    }
    this.updated_at = Date.now();
    next();
});

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;