const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { body, param, validationResult } = require('express-validator');

const validateShopInput = [
  body('shopId').isLength({ min: 8 }).withMessage('Shop ID must be at least 8 characters long'),
  body('name').notEmpty().withMessage('Shop name is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zip').notEmpty().withMessage('Zip code is required'),
  body('address.geoLocation.coordinates').isArray({ min: 2 }).withMessage('Invalid geoLocation coordinates').withMessage('Geolocation coordinates must be an array of length 2 [longitude, latitude]'),
  body('deliveryRadius').isNumeric().withMessage('Delivery radius must be a number'),
  body('minimumOrderValue').isNumeric().withMessage('Minimum order value must be a number'),
  body('deliveryCharges').isNumeric().withMessage('Delivery charges must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateShopId = [
  param('id').isMongoId().withMessage('Invalid shop ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Define routes for shops
router.get('/', shopController.getAllShops);
router.get('/:id', validateShopId, shopController.getShopById);
router.post('/', validateShopInput, shopController.createShop);
router.delete('/:id', validateShopId, shopController.deleteShop);

module.exports = router;
