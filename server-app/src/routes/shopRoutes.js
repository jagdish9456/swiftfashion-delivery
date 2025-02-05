const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Define routes for getting all shops and a shop by ID
router.get('/', shopController.getAllShops);
router.get('/:id', shopController.getShopById);

module.exports = router;
