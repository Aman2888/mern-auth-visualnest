// File: models/UserInfo.js
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  zipCode: {
    type: String,
    trim: true
  },
  dob: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String, // Store image URL
    default: "", // Default empty if no image is uploaded
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;