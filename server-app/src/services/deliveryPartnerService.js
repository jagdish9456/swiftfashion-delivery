const DeliveryPartner = require('../models/DeliveryPartner');
const { generateUniqueId } = require('../utils/idGenerator'); // Import ID generation utility

const deliveryPartnerService = {
  async onboard(deliveryPartnerData) {
    try {
      // Generate a unique partner ID
      const partnerId = await generateUniqueId('partner');

      // Prepare data for the new delivery partner
      const newDeliveryPartnerData = {
        ...deliveryPartnerData,
        partnerId,
        onboardingDate: new Date(),
        lastUpdated: new Date(),
      };

      // Create a new delivery partner document
      const deliveryPartner = new DeliveryPartner(newDeliveryPartnerData);
      await deliveryPartner.save();

      // Return the created delivery partner
      return deliveryPartner;
    } catch (error) {
      console.error('Error onboarding delivery partner:', error);
      // Handle specific errors (e.g., duplicate key error)
      if (error.code === 11000) {
        throw new Error('Partner ID already exists');
      }
      throw error; // Re-throw other errors
    }
  }
};

module.exports = deliveryPartnerService;
