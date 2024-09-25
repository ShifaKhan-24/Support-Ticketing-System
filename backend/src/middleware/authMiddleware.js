const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header (Expected format: "Bearer <token>")
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Split the token from the "Bearer " part
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Add the decoded payload to req.user
    next();
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
