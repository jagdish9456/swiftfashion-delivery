const Shop = require('../models/Shop');
const { generateUniqueId } = require('../utils/idGenerator');

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
  },
  async createShop(shopData) {
    try {
      const shopId = await generateUniqueId('shop');
      const newShopData = { ...shopData, shopId };
      const shop = new Shop(newShopData);
      await shop.save();
      return shop;
    } catch (error) {
      console.error("Error creating shop:", error);
      if (error.code === 11000) {
        throw new Error('Shop ID already exists');
      }
      throw error;
    }
  },
  async deleteShop(id) {
    try {
      const shop = await Shop.findByIdAndDelete(id);
      if (!shop) {
        throw new Error('Shop not found');
      }
      return { message: 'Shop deleted successfully' };
    } catch (error) {
      console.error("Error deleting shop:", error);
      if (error.name === 'CastError') {
        throw new Error('Invalid shop ID');
      }
      throw error;
    }
  }
};

module.exports = shopService;
