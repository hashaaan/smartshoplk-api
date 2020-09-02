const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String, 
    default: "LKR"
  },
  fullname: {
    type: String,
    required:true
  },
  address: {
    street: String,
    unit: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  paymentMethod: {
    type: String,
    default: "card"
  },
  items: [{
    type: Object, 
    required: true
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
