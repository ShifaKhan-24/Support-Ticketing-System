const { GetObjectCommand } = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const s3 = require('../config/awsConfig');

// Function to generate a pre-signed URL for a given S3 key
exports.getPresignedUrl = async (key, expiresIn = 3600) => { // expiresIn is in seconds (default 1 hour)
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key, // S3 object key
    });

    // Generate the pre-signed URL
    const url = await getSignedUrl(s3, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    throw new Error('Could not generate pre-signed URL.');
  }
};
