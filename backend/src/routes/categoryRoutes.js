// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware'); // To secure routes if needed
const roleMiddleware =  require('../middleware/roleMiddleware')
// CRUD operations for categories
router.post('/category', authMiddleware, roleMiddleware('manager'),categoryController.createCategory); // Create a new category
router.get('/category', authMiddleware,roleMiddleware('manager'), categoryController.getAllCategories); // Get all categories
router.get('/category/:id', authMiddleware, roleMiddleware('manager'),categoryController.getCategoryById); // Get a single category by ID
router.put('/category/:id', authMiddleware, roleMiddleware('manager'),categoryController.updateCategory); // Update a category by ID
router.delete('/category/:id', authMiddleware, roleMiddleware('manager'),categoryController.deleteCategory); // Delete a category by ID

module.exports = router;
