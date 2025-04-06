const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['men', 'women', 'unisex'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    adults: {
        type: Boolean,
        default: true
    },
    superSelect: {
        type: String,
        default: 'clothing',
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdModifiedBy: {
        type: String,
        // ref: 'User',
        default:"admin",
        required: true
    },
    createdModifiedOn: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
    ref: 'Subcategory',
    localField: '_id',
    foreignField: 'category'
});

module.exports = mongoose.model('Category', categorySchema);
