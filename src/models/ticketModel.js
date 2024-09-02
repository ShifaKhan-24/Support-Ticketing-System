const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    _id: { type: Number, required: true, unique: true },
    customerId: { type: Number, required: true },
    categoryId: { type: Number, required: true },
    agentId:{type:Number},
    statusId: { type: String, default: 'Open' },
    priority: { type: String },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    closedAt: {type: Date },
    communications: [{ type: Schema.Types.Mixed }]

    // _id: { type: Number},
    // ename:{type:String}

});

module.exports = mongoose.model('tickets', ticketSchema);

