const State = require('../models/State'); // Import the State model

const stateService = {
  async getAllStates() {
    try {
      const states = await State.find();
      return states;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw new Error('Failed to fetch states');
    }
  },
  async getStateById(id) {
    try {
      const state = await State.findById(id);
      if (!state) {
        throw new Error('State not found');
      }
      return state;
    } catch (error) {
      console.error('Error fetching state by ID:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid state ID');
      }
      throw error;
    }
  },
  async createState(stateData) {
    try {
      // Add data validation here (e.g., using Joi or Mongoose validation)
      const state = new State(stateData);
      await state.save();
      return state;
    } catch (error) {
      console.error('Error creating state:', error);
      throw error;
    }
  },
  async updateState(id, stateData) {
    try {
      // Add data validation here
      const state = await State.findByIdAndUpdate(id, stateData, { new: true });
      if (!state) {
        throw new Error('State not found');
      }
      return state;
    } catch (error) {
      console.error('Error updating state:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid state ID');
      }
      throw error;
    }
  },
  async deleteState(id) {
    try {
      const state = await State.findByIdAndDelete(id);
      if (!state) {
        throw new Error('State not found');
      }
      return { message: 'State deleted successfully' };
    } catch (error) {
      console.error('Error deleting state:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid state ID');
      }
      throw error;
    }
  }
};

module.exports = stateService;
