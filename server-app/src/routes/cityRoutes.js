const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const { body, validationResult } = require('express-validator');

// Input validation middleware
const validateCityInput = [
  body('name').notEmpty().withMessage('City name is required'),
  body('stateId').isMongoId().withMessage('Invalid stateId'),
  body('population').isInt({ min: 0 }).withMessage('Population must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Define routes for cities
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/', validateCityInput, cityController.createCity);
router.put('/:id', validateCityInput, cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

module.exports = router;
