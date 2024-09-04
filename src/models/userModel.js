const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // Assuming you are using this for authentication
//     role: { type: String, required: true, enum: ['customer', 'agent', 'manager'] }
// }, {
//     discriminatorKey: 'role', // Key to differentiate between models
//     timestamps: true
// });


const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'agent', 'manager'], required: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  agentDetails: {     // Nested schema for agents
    categoryId: { type: Number, required: function() { return this.role === 'agent'; } }
  },
  customerDetails: {  // Nested schema for customers
    address: { type: String }
  },
  managerDetails: {   // Nested schema for managers
    team: { type: String }
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;


