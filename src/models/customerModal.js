const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    first_name : {type:String,required:true},
    last_name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    phone : {type:String,required:true,unique:true},
    created_at:{type:Date},
    updated_at:{type:Date}
})
  
const customer = mongoose.model('customers', customerSchema);
  module.exports = customer;
