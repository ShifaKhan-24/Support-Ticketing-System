const mongoose = require('mongoose');
const counterModal = require('./counter.model')
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  agentId: { type: Number, unique: true},
  email:{type:String,required:true,ref:'users'},
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Link to the User model
  categoryName: { type: String, required: true },  // Specific field for agents
  availabilityStatus: { type: String, default: 'available' },
});

agentSchema.pre('save', async function (next) {
  if (this.isNew) {
    console.log("New document, incrementing agentId...");
    try {
      const counter = await counterModal.findByIdAndUpdate(
        { _id: 'agentId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.agentId = counter.sequence_value;
      console.log("Generated agentId:", this.agentId);
    } catch (error) {
      return next(error);
    }
  }
  this.updated_at = Date.now();
  next();
});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent