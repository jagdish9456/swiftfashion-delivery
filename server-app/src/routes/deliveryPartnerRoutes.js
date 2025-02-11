const express = require('express');
const router = express.Router();
const deliveryPartnerController = require('../controllers/deliveryPartnerController');
const { body, check } = require('express-validator');

// Input validation middleware using express-validator
const validateDeliveryPartnerInput = [
  body('partnerId').isLength({ min: 8 }).withMessage('Partner ID must be at least 8 characters'),
  body('personalDetails.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('personalDetails.lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('personalDetails.dateOfBirth').isDate().withMessage('Invalid date of birth'),
  body('personalDetails.phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
  body('personalDetails.email').isEmail().withMessage('Invalid email address'),
  body('personalDetails.address.street').notEmpty().withMessage('Street address is required'),
  body('personalDetails.address.city').notEmpty().withMessage('City is required'),
  body('personalDetails.address.state').notEmpty().withMessage('State is required'),
  body('personalDetails.address.zip').notEmpty().withMessage('Zip code is required'),
  body('personalDetails.address.geoLocation.coordinates').isArray({ min: 2 }).withMessage('Invalid geoLocation coordinates').withMessage('Geolocation coordinates must be an array of length 2 [longitude, latitude]'),
  body('identification.documentType').isIn(['DrivingLicense', 'AadhaarCard', 'Passport']).withMessage('Invalid document type'),
  body('identification.documentNumber').isLength({ min: 8 }).withMessage('Document number must be at least 8 characters'),
  body('identification.documentImage').isURL().withMessage('Invalid document image URL'),
  body('identification.verificationStatus').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid verification status'),
  body('vehicleDetails.vehicleType').notEmpty().withMessage('Vehicle type is required'),
  body('vehicleDetails.vehicleNumber').notEmpty().withMessage('Vehicle number is required'),
  body('bankDetails.accountNumber').notEmpty().withMessage('Account number is required'),
  body('bankDetails.bankName').notEmpty().withMessage('Bank name is required'),
  body('bankDetails.ifscCode').notEmpty().withMessage('IFSC code is required'),
  body('availabilitySchedule').isArray({ min: 1 }).withMessage('Availability schedule is required and must contain at least one entry'),
  body('availabilitySchedule.*.day').isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).withMessage('Invalid day'),
  body('availabilitySchedule.*.startTime').isISO8601().withMessage('Invalid start time'),
  body('availabilitySchedule.*.endTime').isISO8601().withMessage('Invalid end time'),
  // Add more validation rules as needed for other fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


// Define route for onboarding a delivery partner
router.post('/', validateDeliveryPartnerInput, deliveryPartnerController.onboard);

module.exports = router;
