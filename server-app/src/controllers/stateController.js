const stateService = require('../services/stateService');

const stateController = {
  async getAllStates(req, res) {
    try {
      const states = await stateService.getAllStates();
      res.json(states);
    } catch (error) {
      console.error("Error fetching states:", error);
      res.status(500).json({ error: error.message });
    }
  },
  async getStateById(req, res) {
    try {
      const state = await stateService.getStateById(req.params.id);
      res.json(state);
    } catch (error) {
      console.error("Error fetching state by ID:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  },
  async createState(req, res) {
    try {
      const state = await stateService.createState(req.body);
      res.status(201).json(state);
    } catch (error) {
      console.error("Error creating state:", error);
      res.status(400).json({ error: error.message });
    }
  },
  async updateState(req, res) {
    try {
      const updatedState = await stateService.updateState(req.params.id, req.body);
      res.json(updatedState);
    } catch (error) {
      console.error("Error updating state:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  },
  async deleteState(req, res) {
    try {
      const result = await stateService.deleteState(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting state:", error);
      res.status(error.message.includes('Invalid') ? 400 : 500).json({ error: error.message });
    }
  }
};

module.exports = stateController;
