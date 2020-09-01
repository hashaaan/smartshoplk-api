const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  smartphone: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
