const mongoose = require('mongoose');

const checkMongoDBConnection = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI environment variable not set');
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  } finally {
    mongoose.disconnect(); // Ensure disconnection even if error occurs
  }
};

module.exports = { checkMongoDBConnection };
