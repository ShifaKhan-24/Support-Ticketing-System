const Customer = require("../models/customerModel");
const Ticket = require("../models/ticketModel");


// Get customer by ID (Customer can only view their own info, Manager can view any customer)
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Check if the requesting user is the customer or a manager
        if ((req.user.role === 'customer' && req.user._id.toString() !== customer._id.toString())|| req.user.role === 'agent') {
            return res.status(403).json({ message: `Access denied: ${req.user.role}'s can only view their own information` });
        }

        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: "Error fetching customer" });
    }
};

exports.createCustomer = async (req,res) =>{
    try{
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.getAllCustomers = async (req, res) =>{
    try{
        const cutomers = await Customer.find();
        res.json(cutomers)
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}
// Update customer by ID (Customer can only update their own info, Manager can update any customer)
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Check if the requesting user is the customer or a manager
        if ((req.user.role === 'customer' && req.user._id.toString() !== customer._id.toString())|| req.user.role === 'agent') {
            return res.status(403).json({ message: `Access denied: ${req.user.role}'s can only view their own information` });
        }

        // Update the customer
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteCustomer = async (req,res) =>{
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if(!customer) return res.status(404).json({error:"Customer not found"});
        res.json({message: "Customer Dleted Successfully"});
    }
    catch{
        res.status(400).json({error: error.message})
    }
}

exports.getCustomerTickets =async (req, res) => {
    try {
        const { id } = req.params;
        const tickets = await Ticket.find({ customerId: id });
        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets found for this customer' });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getCustomerClosedTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const closedTickets = await Ticket.find({ customerId: id, status: 'closed' });
        
        if (!closedTickets.length) {
            return res.status(404).json({ message: 'No closed tickets found for this customer' });
        }
        res.json(closedTickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
