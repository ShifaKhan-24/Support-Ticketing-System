const mongoose =  require('mongoose')
const Schema = mongoose.Schema


const categorySchema = new Schema({
    name: { type: String, enum: ['Billing', 'Technical', 'General'], required: true},
    description: {type: String, required: true},
    created_at:{type:Date,default:Date.now()},
    updated_at:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('categories',categorySchema)