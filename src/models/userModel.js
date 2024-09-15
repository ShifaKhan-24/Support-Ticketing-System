const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'agent', 'manager']},
  phone: { type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  

});

const User = mongoose.model('users', userSchema);
module.exports = User;


