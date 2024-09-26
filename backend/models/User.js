const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  company: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

