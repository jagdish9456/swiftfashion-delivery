const Shop = require('../models/Shop');

const shopService = {
  async getAllShops() {
    try {
      const shops = await Shop.find();
      return shops;
    } catch (error) {
      console.error("Error fetching shops:", error);
      throw new Error('Failed to fetch shops');
    }
  },
  async getShopById(id) {
    try {
      const shop = await Shop.findById(id);
      if (!shop) {
        throw new Error('Shop not found');
      }
      return shop;
    } catch (error) {
      console.error("Error fetching shop by ID:", error);
      if (error.name === 'CastError') {
        throw new Error('Invalid shop ID');
      }
      throw error;
    }
  }
};

module.exports = shopService;
