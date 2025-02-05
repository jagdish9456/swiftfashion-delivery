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
const healthCheckRoutes = require('./src/routes/healthCheckRoutes'); // Import health check routes


// Connect to MongoDB and test connectivity
const testDBConnectivity = async () => {
  try {
    await dbConnectivityService.checkMongoDBConnection();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  }
};

testDBConnectivity();

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

// Error handling middleware (must be placed after all routes)
app.use(errorHandler);

// Start server
const port = config.port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
