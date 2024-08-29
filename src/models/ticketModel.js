const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    categoryId: { type: String, required: true },
    agentId:{type:String},
    statusId: { type: String, default: 'Open' },
    priority: { type: String },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    closedAt: {type: Date },
    communications: [{ type: Schema.Types.Mixed }]
});

module.exports = mongoose.model('Ticket', ticketSchema);
