const productService = require('../services/productService');

const productController = {
  async getProductsByLocation(req, res) {
    try {
      const { latitude, longitude, radius } = req.query;
      const products = await productService.getProductsByLocation(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius)
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = productController;
