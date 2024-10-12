const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minLength: [4, 'A name must have at least 4 characters'],
    maxLength: [20, 'A name can have a maximum length of 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a mail id'],
    unique: true,
  },
  photo: {},
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    unique: [true, 'Password must be unique'],
  },
  passwordConfirmed: {
    type: String,
    required: [true, 'confirm password must match to password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
