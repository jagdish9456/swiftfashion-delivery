const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { validationResult } = require('express-validator');


const authService = {
  async register(userData) {
    // Input validation using express-validator (you'll need to add this middleware to your route)
    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    const user = new User(userData);
    await user.save();
    return user;
  },
  async login(credentials) {
    // Input validation
    const errors = validationResult(credentials);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, config.secret);
    return token;
  }
};

module.exports = authService;
