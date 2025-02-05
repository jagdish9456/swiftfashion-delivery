const Shop = require('../models/Shop');

const shopService = {
  async getAllShops() {
    try {
      const shops = await Shop.find();
      return shops;
    } catch (error) {
      console.error("Error fetching shops:", error); // Log the error for debugging
      throw new Error('Failed to fetch shops'); // Re-throw the error to be handled by the controller
    }
  },
  async getShopById(id) {
    try {
      // Input validation: Check if id is a valid ObjectId.  Mongoose will throw an error if it's not.
      const shop = await Shop.findById(id);
      if (!shop) {
        throw new Error('Shop not found');
      }
      return shop;
    } catch (error) {
      console.error("Error fetching shop by ID:", error); // Log the error for debugging
      if (error.name === 'CastError') {
        throw new Error('Invalid shop ID');
      }
      throw new Error('Failed to fetch shop'); // Re-throw the error to be handled by the controller
    }
  }
};

module.exports = shopService;
