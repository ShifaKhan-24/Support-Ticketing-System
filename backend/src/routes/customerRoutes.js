const express = require('express')
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const customerController = require("../controllers/customerController")

router.get('/customers/:id',auth,customerController.getCustomerById)
router.get('/customers',customerController.getAllCustomers)
router.post('/customers',customerController.createCustomer)
router.put('/customers/:id',auth,customerController.updateCustomer)
router.delete('/customers/:id',auth,roleMiddleware('manager'),customerController.deleteCustomer)
router.get('/customers/:id/tickets',customerController.getCustomerTickets)
router.get('/customers/:id/tickets/closed',customerController.getCustomerClosedTickets)


module.exports= router;