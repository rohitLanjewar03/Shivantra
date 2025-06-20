const express = require('express');
const publicController = require('../controllers/publicController');

const router = express.Router();

// Public menu endpoint
router.get('/menu', publicController.getMenu);

module.exports = router;