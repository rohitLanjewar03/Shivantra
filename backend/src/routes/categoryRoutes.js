const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Create category
router.post('/', categoryController.createCategory);
// Get all categories
router.get('/', categoryController.getCategories);
// Update category
router.put('/:id', categoryController.updateCategory);
// Delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;