const City = require('../models/City'); // Import the City model
const State = require('../models/State'); // Import the State model

const cityService = {
  async getAllCities() {
    try {
      const cities = await City.find();
      return cities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw new Error('Failed to fetch cities');
    }
  },
  async getCityById(id) {
    try {
      const city = await City.findById(id);
      if (!city) {
        throw new Error('City not found');
      }
      return city;
    } catch (error) {
      console.error('Error fetching city by ID:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid city ID');
      }
      throw error;
    }
  },
  async createCity(cityData) {
    try {
      // Add data validation here (e.g., using Joi or Mongoose validation)
      const stateExists = await State.exists({ _id: cityData.stateId });
      if (!stateExists) {
        throw new Error('Invalid stateId: State not found');
      }
      const city = new City(cityData);
      await city.save();
      return city;
    } catch (error) {
      console.error('Error creating city:', error);
      throw error;
    }
  },
  async updateCity(id, cityData) {
    try {
      // Add data validation here
      const stateExists = await State.exists({ _id: cityData.stateId });
      if (!stateExists) {
        throw new Error('Invalid stateId: State not found');
      }
      const city = await City.findByIdAndUpdate(id, cityData, { new: true });
      if (!city) {
        throw new Error('City not found');
      }
      return city;
    } catch (error) {
      console.error('Error updating city:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid city ID');
      }
      throw error;
    }
  },
  async deleteCity(id) {
    try {
      const city = await City.findByIdAndDelete(id);
      if (!city) {
        throw new Error('City not found');
      }
      return { message: 'City deleted successfully' };
    } catch (error) {
      console.error('Error deleting city:', error);
      if (error.name === 'CastError') {
        throw new Error('Invalid city ID');
      }
      throw error;
    }
  }
};

module.exports = cityService;
