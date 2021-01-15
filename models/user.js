const mongoose = require('mongoose');

// Create my schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minimum: 7,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minimum: 7,
  },
});

// Give my model a name and tell my MongoDB what schema to use when creating data.
module.exports = mongoose.model('User', UserSchema);
