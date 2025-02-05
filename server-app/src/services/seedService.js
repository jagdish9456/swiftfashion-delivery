const State = require('../models/State');
const City = require('../models/City');
const statesData = require('../data/states.json').states;
const citiesData = require('../data/cities.json').cities;

const seedDatabase = async () => {
  try {
    // Clear existing data before seeding
    await State.deleteMany({}); 
    await City.deleteMany({});

    // Insert states
    await State.insertMany(statesData);
    console.log('States seeded successfully');

    // Insert cities
    await City.insertMany(citiesData);
    console.log('Cities seeded successfully');

    return { states: statesData, cities: citiesData };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw new Error('Failed to seed database');
  }
};

module.exports = { seedDatabase };
