const State = require('../models/State');
const City = require('../models/City');
const DeliveryPartner = require('../models/DeliveryPartner');
const statesData = require('../data/states.json').states;
const citiesData = require('../data/cities.json').cities;
const deliveryPartnersData = require('../data/mockDeliveryPartners.json');

const seedDatabase = async () => {
  try {
    await State.deleteMany({});
    await City.deleteMany({});
    await DeliveryPartner.deleteMany({});

    await State.insertMany(statesData);
    console.log('States seeded successfully');

    await City.insertMany(citiesData);
    console.log('Cities seeded successfully');

    await DeliveryPartner.insertMany(deliveryPartnersData);
    console.log('Delivery partners seeded successfully');

    return { states: statesData, cities: citiesData, deliveryPartners: deliveryPartnersData };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw new Error('Failed to seed database');
  }
};

module.exports = { seedDatabase };
