const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/multer');

// Create item
router.post('/', upload.single('image'), itemController.createItem);
// Get all items
router.get('/', itemController.getAllItems);
// Update item
router.put('/:id', upload.single('image'), itemController.updateItem);
// Delete item
router.delete('/:id', itemController.deleteItem);
// Get items by category
router.get('/category/:categoryId', itemController.getItemsByCategory);

module.exports = router; 