const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "LKR",
    },
    address: {
      street: String,
      unit: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    paymentMethod: {
      type: String,
      default: "credit",
    },
    items: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
