// src/controllers/notificationController.js

const Notification = require('../models/notificationModel');
const { sendEmail } = require('../services/notificationService');

// Controller function to handle notification creation without sending any response
exports.createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        console.log('Received data:', req.body);


        if (!userId || !message) {
            console.error('Invalid data: userId and message are required.');
            return;
        }

        // Create the notification and save it to the database
        const notification = new Notification({ userId, message });
        await notification.save();

        // Send the email notification
        try {
            await sendEmail(process.env.NOTIFICATION_EMAIL || 'sahilt626@gmail.com', 'New Notification', message);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

   
        // Send a success response
        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
