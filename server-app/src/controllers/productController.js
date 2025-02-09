const productService = require('../services/productService');

const productController = {
  async getProductsByLocation(req, res) {
    try {
      const { latitude, longitude, radius } = req.query;
      // Input validation: Check if latitude, longitude, and radius are provided and are numbers.
      if (!latitude || !longitude || !radius || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude)) || isNaN(parseFloat(radius))) {
        return res.status(400).json({ error: 'Invalid input parameters' });
      }
      const products = await productService.getProductsByLocation(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius)
      );
      res.json(products);
    } catch (error) {
      console.error("Error in getProductsByLocation:", error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }
};

module.exports = productController;
