const mongoose = require('mongoose');

const checkMongoDBConnection = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI environment variable not set');
  }

  try {
    await mongoose.connect(mongoURI);
    return true;
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  } finally {
    await mongoose.disconnect(); // Ensure disconnection
  }
};

module.exports = { checkMongoDBConnection };
