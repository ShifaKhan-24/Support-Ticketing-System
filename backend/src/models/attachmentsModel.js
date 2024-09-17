const mongoose = require('mongoose');


const attachmentSchema = new mongoose.Schema({
    ticketId: { type: Number, ref: 'tickets', required: true },
    categoryName: { type: String, ref: 'categories' },
    fileUrl: { type: String, required: true },  // Store the S3 file URL
    fileType: { type: String, required: true }, // e.g., 'image/jpeg', 'application/pdf'
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    fileSize:{type:Number}
  });
  
  module.exports = mongoose.model('attachments', attachmentSchema);
  