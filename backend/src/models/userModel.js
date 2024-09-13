const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'agent', 'manager'], required: true },
  phone: { type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // agentDetails: {     // Nested schema for agents
  //   categoryName: { type: Number, required: function() { return this.role === 'agent'; } },
  //   assignedTickts:{type:Array}
  // },
  // customerDetails: {  // Nested schema for customers
  //   address: { type: String }
  // },
  // managerDetails: {   // Nested schema for managers
  //   team: { type: String }
  // }
});

const User = mongoose.model('users', userSchema);
module.exports = User;


