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

module.exports= router;