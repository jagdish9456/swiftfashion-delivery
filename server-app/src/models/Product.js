const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  colors: [{
    type: String
  }],
  type: [{
    type: String
  }],
  material: {
    type: String
  },
  sizes: [{
    type: String
  }],
  season: [{
    type: String
  }],
  wearType: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  brand: {
    type: String
  }
});

module.exports = mongoose.model('Product', productSchema);
