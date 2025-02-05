const express = require('express');
const router = express.Router();
const seedService = require('../services/seedService');

// Seed route
router.post('/', async (req, res) => {
  try {
    const seededData = await seedService.seedDatabase();
    res.json(seededData);
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
