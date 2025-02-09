const Shop = require('../models/Shop');

const productService = {
  async getProductsByLocation(latitude, longitude, radius) {
    // Input validation: Check if latitude, longitude, and radius are valid numbers.
    if (
      isNaN(latitude) ||
      isNaN(longitude) ||
      isNaN(radius) ||
      radius <= 0
    ) {
      throw new Error('Invalid latitude, longitude, or radius');
    }

    // Geospatial query to find shops within the radius
    const shops = await Shop.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "dist",
          maxDistance: radius * 1000, // Convert radius to meters
          spherical: true
        }
      },
      {
        $match: {
          isActive: true // Only include active shops
        }
      },
      { $project: { _id: 1, name: 1, address: 1, products: 1, dist: 1 } } // Project necessary fields
    ]);

    // Extract and return products from shops
    return shops.flatMap((shop) => shop.products).map(product => ({
      ...product,
      shopId: shop._id,
      distance: shop.dist
    }));
  }
};

module.exports = productService;
