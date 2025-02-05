const seedService = require('../services/seedService');

const seedController = {
  async seed(req, res) {
    try {
      const seededData = await seedService.seedDatabase();
      res.json(seededData);
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = seedController;
