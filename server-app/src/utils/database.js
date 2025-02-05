const mongoose = require('mongoose');
const config = require('../../config/config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn; // Return the connection object
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; // Re-throw the error to be handled by server.js
  }
};

module.exports = connectDB;
