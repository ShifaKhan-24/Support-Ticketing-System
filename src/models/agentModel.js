const mongoose = require('mongoose');
// const User = require('./userModel')
const agentSchema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: { 
        type: Number, 
        required: true 
    }
});


// const agentSchema = new mongoose.Schema({
//     status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
//     assignedTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
//     categoryId:{type:Number,required:true}
// // });

// const Agent = User.discriminator('agent', agentSchema);

const Agent = mongoose.model('agents',agentSchema)
module.exports = Agent;
