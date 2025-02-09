require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./src/utils/database');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const dbConnectivityService = require('./src/services/dbConnectivityService');
const healthCheckRoutes = require('./src/routes/healthCheckRoutes');
const seedRoutes = require('./src/routes/seedRoutes');
const stateRoutes = require('./src/routes/stateRoutes');
const cityRoutes = require('./src/routes/cityRoutes'); // Import city routes


// Asynchronous function to test DB connectivity before server start
const testDBConnectivity = async () => {
  try {
    await dbConnectivityService.checkMongoDBConnection();
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
};

// Run the DB connectivity test before starting the server
testDBConnectivity().then(() => {
  const app = express();

  // Middleware
  app.use(cors(config.cors));
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/shops', shopRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api', healthCheckRoutes); // Mount health check routes at /api/health
  app.use('/api/seed', seedRoutes); // Mount seed routes
  app.use('/api/states', stateRoutes); // Mount state routes
  app.use('/api/cities', cityRoutes); // Mount city routes

  // Error handling middleware (must be after all routes)
  app.use(errorHandler);

  // Start server
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => console.error("Failed to start server due to DB connection error:", err));
