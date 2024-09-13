const express = require('express')
const router = express.Router();

const customerController = require("../controllers/customerController")

router.get('/customers/:id',customerController.getCustomerById)
router.get('/customers',customerController.getAllCustomers)
router.post('/customers',customerController.createCustomer)
router.put('/customers/:id',customerController.updateCustomer)
router.delete('/customers/:id',customerController.deleteCustomer)
router.get('/customers/:id/tickets',customerController.getCustomerTickets)
router.get('/customers/:id/tickets',customerController.getCustomerClosedTickets)


module.exports= router;