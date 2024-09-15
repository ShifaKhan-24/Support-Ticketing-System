const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Agent = require('../models/agentModel');
const Customer = require('../models/customerModel');
const Manager = require('../models/managerModel');
const { jwtSecret, jwtExpire } = require('../config/jwtConfig');

console.log(" - ",Agent)
// Register User
// exports.register = async (req, res) => {
//     try {
//       const { fullName, email, password, role, ...roleSpecificData } = req.body;
  
//       // Check if user already exists
//       let user = await User.findOne({ email });
//       if (user) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
  
//       // Create new user
//       user = new User({ fullName, email, password: await bcrypt.hash(password, 10), role });
//       await user.save();
  
//       // Create role-specific data
//       if (role === 'agent') {
//         const lastAgent = await Agent.findOne().sort({ agentId: -1 });
//         const newAgentId = lastAgent && lastAgent.agentId ? Number(lastAgent.agentId) + 1 : 1;
//         await new Agent({ agentId: newAgentId, userId: user._id,email: email, ...roleSpecificData }).save();
//         console.log("Last agent found:", lastAgent);

//     }
//     else if (role === 'customer') {
//         const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
//         const newCustomerId = (lastCustomer ? lastCustomer.customerId + 1 : 1);
//         await new Customer({ customerId: newCustomerId, userId: user._id, ...roleSpecificData }).save();
//       } else if (role === 'manager') {
//         const lastManager = await Manager.findOne().sort({ managerId: -1 });
//         const newManagerId = (lastManager ? lastManager.managerId + 1 : 1);
//         await new Manager({ managerId: newManagerId, userId: user._id, ...roleSpecificData }).save();
//       }
  
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Automatically assign the role as 'customer'
    const role = 'customer';

    // Create new user
    user = new User({ 
      fullName, 
      email, 
      password: await bcrypt.hash(password, 10), 
      role, 
      phone 
    });
    await user.save();

    // Create the customer-specific entry
    const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
    const newCustomerId = lastCustomer && lastCustomer.customerId ? Number(lastCustomer.customerId) + 1 : 1;
    
    const customer = new Customer({
      customerId: newCustomerId,
      userId: user._id,
      phone: phone,
      address: address
    });
    
    await customer.save();

    res.status(201).json({ message: 'User registered successfully as customer' });
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
      { _id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpire }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
