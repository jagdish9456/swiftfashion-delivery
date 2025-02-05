const cityService = require('../services/cityService');

const cityController = {
  async getAllCities(req, res) {
    try {
      const cities = await cityService.getAllCities();
      res.json(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: error.message });
    }
  },
  async getCityById(req, res) {
    try {
      const city = await cityService.getCityById(req.params.id);
      res.json(city);
    } catch (error) {
      console.error("Error fetching city by ID:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  },
  async createCity(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const city = await cityService.createCity(req.body);
      res.status(201).json(city);
    } catch (error) {
      console.error("Error creating city:", error);
      res.status(400).json({ error: error.message });
    }
  },
  async updateCity(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedCity = await cityService.updateCity(req.params.id, req.body);
      res.json(updatedCity);
    } catch (error) {
      console.error("Error updating city:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  },
  async deleteCity(req, res) {
    try {
      const result = await cityService.deleteCity(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting city:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  }
};

module.exports = cityController;
