const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  logo: {
    type: String, // URL to logo image
    default: '',
  },
  openingHours: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#1f2937', // Default dark gray
    },
    accentColor: {
      type: String,
      default: '#3b82f6', // Default blue
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema); 