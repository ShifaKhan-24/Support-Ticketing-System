const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Agent = require('../models/agentModel');
const Customer = require('../models/customerModel');
const Manager = require('../models/managerModel');
const { jwtSecret, jwtExpire } = require('../config/jwtConfig');

console.log(" - ",Agent)
// Register User
exports.register = async (req, res) => {
  try {
      const { fullName, email, password, phone, address } = req.body;
      
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create a new customer user (default role: 'customer')
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ fullName, email, password: hashedPassword, role: 'customer' });
      await user.save();

      // Create a new customer entry
      const customer = new Customer({
          userId: user._id,
          phone,
          address
      });
      await customer.save();

      res.status(201).json({ message: 'Customer registered successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  
// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpire }
    );

    let additionalId = null;
    if (user.role === 'agent') {
      const agent = await Agent.findOne({ userId: user._id });
      additionalId = agent ? agent.agentId : null;
    } else if (user.role === 'customer') {
      const customer = await Customer.findOne({ userId: user._id });
      additionalId = customer ? customer.customerId : null;
    }

    res.status(200).json({ token, role: user.role, id: additionalId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
