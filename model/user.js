const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  cartItems: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
