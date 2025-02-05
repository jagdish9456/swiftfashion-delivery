const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('State', stateSchema);
