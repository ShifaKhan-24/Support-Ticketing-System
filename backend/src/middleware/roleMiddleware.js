// middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed

// Middleware to check user role
const roleMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        try {
            // Check if user is authenticated and has a token
            console.log("Token Verification Secret:", process.env.JWT_SECRET);
            const token = req.headers.authorization?.split(' ')[1];
            console.log("Token from request:", token);

            if (!token) return res.status(401).json({ error: 'No token provided' });

            // Verify token and extract user data
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token payload:", decoded);
           

            const user = await User.findById(decoded.userId);

            if (!user) return res.status(401).json({ error: 'User not found' });

            // Check if user role matches the required role
            if (user.role !== requiredRole) {
                return res.status(403).json({ error: `Access denied. Only ${requiredRole} can perform this action.` });
            }

            // Proceed to the next middleware or route handler
            req.user = user; // Optionally attach user to request
            next();
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: 'Invalid token' });
        }
    };
};


module.exports = roleMiddleware;
