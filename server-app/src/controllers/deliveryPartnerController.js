const deliveryPartnerService = require('../services/deliveryPartnerService');
const { validationResult } = require('express-validator');

const deliveryPartnerController = {
  async onboard(req, res) {
    try {
      // Check for validation errors from express-validator middleware
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract relevant data from request body (sanitize and validate as needed)
      const { 
        partnerId, 
        personalDetails, 
        identification, 
        vehicleDetails, 
        bankDetails, 
        availabilitySchedule 
      } = req.body;

      // Prepare data for the service
      const deliveryPartnerData = {
        partnerId,
        personalDetails,
        identification: {
          ...identification,
          verificationStatus: 'pending' // Set initial verification status to 'pending'
        },
        vehicleDetails,
        bankDetails,
        availability: {
          isAvailable: false, // Initially set availability to false
          availabilitySchedule
        }
      };

      // Onboard the delivery partner using the service
      const deliveryPartner = await deliveryPartnerService.onboard(deliveryPartnerData);

      // Send success response
      res.status(201).json({ message: 'Delivery partner onboarded successfully', deliveryPartner });
    } catch (error) {
      console.error("Error onboarding delivery partner:", error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }
};

module.exports = deliveryPartnerController;
