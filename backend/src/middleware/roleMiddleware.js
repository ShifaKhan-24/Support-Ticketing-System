// middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed

const roleMiddleware = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ error: 'No token provided' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) return res.status(401).json({ error: 'User not found' });

            // Check if user's role is in the requiredRoles array
            if (!Array.isArray(requiredRoles)) {
                requiredRoles = [requiredRoles]; // Convert to array if it's a single role
            }

            if (!requiredRoles.includes(user.role)) {
                return res.status(403).json({ error: `Access denied. Only ${requiredRoles.join(' or ')} can perform this action.` });
            }

            req.user = user; // Optionally attach user to request
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
};

module.exports = roleMiddleware;
