const mongoose = require('mongoose');
// const User = require('./userModel'); // Make sure this path is correct


const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String }
})

// const customerSchema = new mongoose.Schema({
//     address: { type: String },
//     phone: { type: String },
// });

// const Customer = User.discriminator('customer', customerSchema);

const Customer = mongoose.model('customers',customerSchema)
module.exports = Customer;
