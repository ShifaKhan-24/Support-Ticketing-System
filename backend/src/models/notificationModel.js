const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    sentAt: { type: Date }
});

module.exports = mongoose.model('Notification', notificationSchema);
