const shopService = require('../services/shopService');

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
  }
};

module.exports = shopController;
