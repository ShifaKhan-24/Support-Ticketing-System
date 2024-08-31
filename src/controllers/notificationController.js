const Notification = require('../models/notificationModel');
const { sendEmail } = require('../services/notificationService');

// Helper function for notification creation logic
const createNotificationLogic = async (userId, message) => {
    if (!userId || !message) {
        throw new Error('userId and message are required.');
    }

    const notification = new Notification({ userId, message });
    await notification.save();

    // Send email notification
    try {
        const recipientEmail = process.env.NOTIFICATION_EMAIL || 'default@example.com'; // Use environment variable or default
        await sendEmail(recipientEmail, 'New Notification', message);
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Optionally, log the error or notify an admin
    }

    return notification;
};

// Controller function to handle endpoint requests
exports.createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: 'userId and message are required.' });
        }

        const notification = await createNotificationLogic(userId, message);
        res.status(201).json(notification); // Send the created notification as a response
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to be used in other controllers
exports.createNotificationForTicket = async (notificationData) => {
    try {
        const { userId, message } = notificationData;
        const notification = await createNotificationLogic(userId, message);
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Throw error to be handled by the calling function
    }
};

// Function to get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
