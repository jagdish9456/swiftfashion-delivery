const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    geoLocation: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
    }
  },
  cart: [{
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    productId: String,
    quantity: Number,
    options: { size: String, color: String }
  }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
