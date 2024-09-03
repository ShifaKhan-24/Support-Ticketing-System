const mongoose = require('mongoose');

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

module.exports = mongoose.model('Agent', agentSchema);
