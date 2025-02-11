const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  partnerId: { type: String, required: true, unique: true },
  personalDetails: {
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String, required: true, minLength: 2 },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true, minLength: 10 },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      geoLocation: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
      }
    }
  },
  identification: {
    documentType: { type: String, enum: ['DrivingLicense', 'AadhaarCard', 'Passport'], required: true },
    documentNumber: { type: String, required: true, minLength: 8 },
    documentImage: String,
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    verificationNotes: String
  },
  vehicleDetails: {
    vehicleType: String,
    vehicleNumber: String,
    vehicleDocuments: [String]
  },
  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    panNumber: String
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  onboardingDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  notes: String,
  ratings: {
    averageRating: { type: Number, min: 0, max: 5 },
    totalRatings: { type: Number, min: 0, default: 0 }
  },
  earnings: {
    totalEarnings: { type: Number, min: 0, default: 0 },
    weeklyEarnings: { type: Number, min: 0, default: 0 }
  },
  availability: {
    isAvailable: { type: Boolean, default: false },
    availabilitySchedule: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }]
  }
});

// Create a 2dsphere index for geoLocation
deliveryPartnerSchema.index({ 'address.geoLocation': '2dsphere' });

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
