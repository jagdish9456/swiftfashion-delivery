const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
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
  phoneNumber: String,
  openingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  categories: [String],
  deliveryRadius: { type: Number, required: true },
  minimumOrderValue: { type: Number, required: true },
  deliveryCharges: { type: Number, required: true },
  averageDeliveryTime: Number,
  rating: Number,
  totalReviews: Number,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
