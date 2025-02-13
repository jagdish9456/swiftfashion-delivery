const shopService = require('../services/shopService');
const { validationResult } = require('express-validator');

const shopController = {
  async getAllShops(req, res) {
    try {
      const shops = await shopService.getAllShops();
      res.json(shops);
    } catch (error) {
      console.error("Error fetching shops:", error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
  async getShopById(req, res) {
    try {
      const shopId = req.params.id;
      // Input validation: Check if shopId is provided and is a valid ObjectId.
      if (!shopId) {
        return res.status(400).json({ error: 'Shop ID is required' });
      }
      const shop = await shopService.getShopById(shopId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      res.json(shop);
    } catch (error) {
      console.error("Error fetching shop by ID:", error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
  async createShop(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const shop = await shopService.createShop(req.body);
      res.status(201).json(shop);
    } catch (error) {
      console.error("Error creating shop:", error);
      res.status(400).json({ error: error.message });
    }
  },
  async deleteShop(req, res) {
    try {
      const result = await shopService.deleteShop(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting shop:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  }
};

module.exports = shopController;
