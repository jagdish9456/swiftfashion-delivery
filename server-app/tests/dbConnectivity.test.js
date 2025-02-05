const { checkMongoDBConnection } = require('../src/services/dbConnectivityService');
const mongoose = require('mongoose');

// Mock the environment variable for testing purposes
const originalEnv = process.env;

afterEach(() => {
  // Restore the original environment variables after each test
  process.env = { ...originalEnv };
});

describe('checkMongoDBConnection', () => {
  it('should successfully connect to MongoDB', async () => {
    // Mock a successful connection scenario
    process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb'; // Replace with a valid test URI
    const result = await checkMongoDBConnection();
    expect(result).toBe(true);
  });

  it('should handle a failed connection to MongoDB', async () => {
    // Mock a failed connection scenario (invalid URI)
    process.env.MONGODB_URI = 'mongodb://invalid-uri';
    await expect(checkMongoDBConnection()).rejects.toThrowError();
  });

  it('should handle missing MONGODB_URI', async () => {
    // Mock a scenario where MONGODB_URI is not set
    delete process.env.MONGODB_URI;
    await expect(checkMongoDBConnection()).rejects.toThrowError('MONGODB_URI environment variable not set');
  });

  it('should disconnect from MongoDB after connection attempt', async () => {
    // Mock a successful connection scenario
    process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb'; // Replace with a valid test URI
    await checkMongoDBConnection();
    expect(mongoose.connection.readyState).toBe(0); // Check if connection is closed
  });

  it('should disconnect from MongoDB after failed connection attempt', async () => {
    // Mock a failed connection scenario (invalid URI)
    process.env.MONGODB_URI = 'mongodb://invalid-uri';
    try {
      await checkMongoDBConnection();
    } catch (error) {
      // Expect an error to be thrown
    }
    expect(mongoose.connection.readyState).toBe(0); // Check if connection is closed
  });
});
