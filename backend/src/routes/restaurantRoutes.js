const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const upload = require('../middleware/multer');

// Public route to get restaurant info
router.get('/', restaurantController.getRestaurant);

// Admin routes
router.post('/', upload.single('logo'), restaurantController.createRestaurant);
router.put('/:id', upload.single('logo'), restaurantController.updateRestaurant);

module.exports = router; 