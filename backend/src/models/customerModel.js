const mongoose = require('mongoose');
const counterModal = require('./counter.model');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerId: { type: Number, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Link to the User model
    phone: { type: String, required: true },
    address: { type: String },  // Customer-specific field
  });
  
  customerSchema.pre('save', async function (next) {
    if (this.isNew) {
        console.log("New document, incrementing customerId...");
        try {
          const counter = await counterModal.findByIdAndUpdate(
            { _id: 'customerId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
          );
          this.customerId = counter.sequence_value;
          console.log("Generated customerId:", this.customerId);
        } catch (error) {
          return next(error);
        }
      }
      this.updated_at = Date.now();
      next();
  });

// const customerSchema = new mongoose.Schema({
//     address: { type: String },
//     phone: { type: String },
// });

// const Customer = User.discriminator('customer', customerSchema);

const Customer = mongoose.model('customers',customerSchema)
module.exports = Customer;
