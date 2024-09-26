const User = require('../models/userModel');
const Agent = require('../models/agentModel');
const Customer = require('../models/customerModel');
const bcrypt = require('bcryptjs');
const Manager = require('../models/managerModel');


exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, role, phone, categoryName, availabilityStatus, department } = req.body;

        // Check if the role is valid
        if (!['customer', 'agent', 'manager'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ fullName, email, password: hashedPassword, role });
        await user.save();

        
        // Handle role-specific schema creation
        if (role === 'customer') {
            const customer = new Customer({
                userId: user._id,

                phone: req.body.phone,
                address: req.body.address

               
            });
            await customer.save();
        } else if (role === 'agent') {
            const lastAgent = await Agent.findOne().sort({ agentId: -1 });
            const newAgentId = lastAgent && lastAgent.agentId ? Number(lastAgent.agentId) + 1 : 1;
            const agent = new Agent({
                agentId: newAgentId,
                userId: user._id,
                email,
                categoryName,
                availabilityStatus
            });
            await agent.save();
        } else if (role === 'manager') {
            const lastManager = await Manager.findOne().sort({ managerId: -1 });
            const newManagerId = lastManager && lastManager.managerId ? Number(lastManager.managerId) + 1 : 1;
            const manager = new Manager({
                managerId: newManagerId,
                managerId: newManagerId,
                userId: user._id,
                department
                
            });
            await manager.save();
        }

        res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users or filter by role
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const users = role ? await User.find({ role }) : await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const loggedInUser = await User.findById(req.user.userId); // Assuming req.user.userId contains the logged-in user's ID

        // 1. Allow customers to update only their own information
        if (loggedInUser.role === 'customer') {
            if (loggedInUser._id.toString() !== user._id.toString()) {
                return res.status(403).json({ error: 'Access denied. Customers can only update their own information.' });
            }
        }

        // 2. Allow managers to update agents and managers
        if (loggedInUser.role === 'manager') {
            if (user.role !== 'agent' && user.role !== 'manager') {
                return res.status(403).json({ error: 'Access denied. Managers can only update agents and managers.' });
            }
        }

        // 3. Prevent agents from updating other users
        if (loggedInUser.role === 'agent') {
            return res.status(403).json({ error: 'Access denied. Agents cannot update other users.' });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get users by email (specific to customers)
exports.getCustomerByEmail = async (req, res) => {
    try {
        const customer = await User.findOne({ email: req.params.email, role: 'customer' });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get agents by categoryName
exports.getAgentsByCategory = async (req, res) => {
    try {
        const agents = await User.find({ categoryName: req.params.categoryName, role: 'agent' });
        if (agents.length === 0) return res.status(404).json({ error: 'No agents found for this category' });
        res.json(agents);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all agents
exports.getAllAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: 'agent' });
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAgentTickets  =async (req, res) =>{
    res.status(200).json({message:"Tickets assigned to agent"})
}
