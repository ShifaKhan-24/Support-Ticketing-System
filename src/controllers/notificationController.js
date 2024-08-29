const Notification = require('../models/notificationModel');
const { sendEmail } = require('../services/notificationService');

exports.createNotification = async (notificationData) => {
    try {
        const { userId, message } = notificationData;
        const notification = new Notification({ userId, message });
        await notification.save();

        // Send email notification
        try {
            await sendEmail('sahilt626@gmail.com', 'New Notification', message); // Example email
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Handle email sending errors if needed
        }

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Throw error to be handled by the calling function
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
