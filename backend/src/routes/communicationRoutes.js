// routes.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.post('/tickets/:ticketId/communications', communicationController.addCommunication);
router.get('/tickets/:ticketId/communications', communicationController.getCommunications);

module.exports = router;



// const express = require('express')
// const router = express.Router();

// const customerController = require("../controllers/customerController")

// router.get('/customers/:id',customerController.getCustomerById)
// router.get('/customers',customerController.getAllCustomers)
// router.post('/customers',customerController.createCustomer)
// router.put('/customers/:id',customerController.updateCustomer)
// router.delete('/customers/:id',customerController.deleteCustomer)
// router.get('/customers/:id/tickets',customerController.getCustomerTickets)
// router.get('/customers/:id/tickets/closed',customerController.getCustomerClosedTickets)


// module.exports= router;