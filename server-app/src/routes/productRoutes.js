const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define route for getting products by location
router.get('/location', productController.getProductsByLocation);

module.exports = router;
