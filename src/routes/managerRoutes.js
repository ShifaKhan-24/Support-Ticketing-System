// routes/managerRoutes.js
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Protect all manager routes with authentication and role-based access
router.post('/managers', authMiddleware, roleMiddleware('manager'), managerController.createManager);
router.get('/managers', authMiddleware, roleMiddleware('manager'), managerController.getAllManagers);
router.get('/managers/:id', authMiddleware, roleMiddleware('manager'), managerController.getManagerById);
router.put('/managers/:id', authMiddleware, roleMiddleware('manager'), managerController.updateManagerById);
router.delete('/managers/:id', authMiddleware, roleMiddleware('manager'), managerController.deleteManager);

// Assign ticket to an agent (Manager action)

// router.post('/assign-ticket', authMiddleware, roleMiddleware('manager'), managerController.assignTicket);

module.exports = router;
