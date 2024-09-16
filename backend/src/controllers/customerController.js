const Customer = require("../models/customerModel");
const Ticket = require("../models/ticketModel");


exports.getCustomerById = async (req, res) =>{
    try{
        const customer =  await Customer.findById(req.params.id);
        if(!customer){  
            return res.status(404).json({message: "Customer not found"});
            }
        res.json(customer);
        }catch(err){
            res.status(500).json({message: "Error fetching customer"});
            
    }
}

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

exports.updateCustomer = async (req,res) =>{
    try{
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(customer);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
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
