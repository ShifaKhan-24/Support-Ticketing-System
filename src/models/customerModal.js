const mongoose = require('mongoose');
const counterModal = require('./counter.model')
const customerSchema = new mongoose.Schema({
    customer_id: { type: Number, unique: true },
    first_name : {type:String,required:true},
    last_name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    phone : {type:String,required:true,unique:true},
    created_at:{type:Date},
    updated_at:{type:Date}
})

  
  // const demoSchema = new mongoose.Schema({
  //   customer_id: { type: Number, unique: true }, // Auto-incremented custom ID
  //   name: { type: String, required: true },
  //   contact: { type: Number, required: true, unique: true },
  //   created_at: { type: Date, default: Date.now },
  //   updated_at: { type: Date }
  // });
  
  // Middleware to auto-increment customer_id before saving
  
  customerSchema.pre('save', async function (next) {
    if (this.isNew) {
        console.log("New document, incrementing customer_id...");
        try {
          const counter = await counterModal.findByIdAndUpdate(
            { _id: 'customerId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
          );
          this.customer_id = counter.sequence_value;
          console.log("Generated customer_id:", this.customer_id);
        } catch (error) {
          return next(error);
        }
      }
      this.updated_at = Date.now();
      next();
  });
  
  const customer = mongoose.model('customers', customerSchema);
  
  module.exports = customer;
