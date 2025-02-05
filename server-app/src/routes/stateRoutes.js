const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const { body, validationResult } = require('express-validator');

// Input validation middleware
const validateStateInput = [
  body('name').notEmpty().withMessage('State name is required'),
  body('abbreviation').notEmpty().withMessage('Abbreviation is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Define routes for states
router.get('/', stateController.getAllStates);
router.get('/:id', stateController.getStateById);
router.post('/', validateStateInput, stateController.createState);
router.put('/:id', validateStateInput, stateController.updateState);
router.delete('/:id', stateController.deleteState);

module.exports = router;
