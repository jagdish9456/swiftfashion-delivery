const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify token using the secret key from config.js
    const decoded = jwt.verify(token, config.secret);
    // Add user information to the request object for further processing
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error); // Log the error for debugging
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
