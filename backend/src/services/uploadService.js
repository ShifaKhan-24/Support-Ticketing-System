const multerS3 = require('multer-s3');
const s3 = require('../config/awsConfig');
const multer = require('multer')

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAMEn || "customer-support-ticketing-attachments", // Bucket name from .env
   
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const timestamp = Date.now();
      const fileName = `${req.body.ticketId}_${file.originalname.split('.')[0]}_${timestamp}.${file.originalname.split('.').pop()}`;
      
      // Ensure categoryName is provided
      console.log("req body in upload service- ",req.body)
      console.log("category - ",req.body.categoryName);

      const categoryFolder = req.body.categoryName ? req.body.categoryName.toLowerCase() : 'general';  // Fallback to 'general' if not provided
      
      cb(null, `${categoryFolder}/${fileName}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  limits: { fileSize: 1024 * 1024 * 2 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
    }
  },
});

module.exports = upload;
