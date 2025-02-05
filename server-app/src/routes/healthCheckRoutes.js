const express = require('express');
const router = express.Router();
const dbConnectivityService = require('../services/dbConnectivityService');

router.get('/health', async (req, res) => {
  try {
    const isConnected = await dbConnectivityService.checkMongoDBConnection();
    res.json({ status: isConnected ? 'success' : 'failure' });
  } catch (error) {
    console.error("Error in health check:", error); // Log the error for debugging
    res.status(500).json({ status: 'failure', error: error.message });
  }
});

module.exports = router;
