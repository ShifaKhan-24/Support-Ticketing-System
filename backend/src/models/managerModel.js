const mongoose = require('mongoose');
const counterModal = require('./counter.model')

const Schema = mongoose.Schema;
const managerSchema = new Schema({
    managerId: { type: Number, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Link to the User model
    department: { type: String, required: true },  // Specific field for managers

  });
  
  managerSchema.pre('save', async function (next) {
    if (this.isNew) {
        console.log("New document, incrementing managerId...");
        try {
          const counter = await counterModal.findByIdAndUpdate(
            { _id: 'managerId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
          );
          this.managerId = counter.sequence_value;
          console.log("Generated managerId:", this.managerId);
        } catch (error) {
          return next(error);
        }
      }
      this.updated_at = Date.now();
      next();
  });
  module.exports = mongoose.model('manager', managerSchema);
  
  