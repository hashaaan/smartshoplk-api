const mongoose = require("mongoose");

const smartphoneSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  modelNo: {
    type: String,
    maxlength: 20,
    required: true,
  },
  storage: String,
  color: String,
  features: String,
  description: String,
  rating: Number,
  price: {
    type: Number,
    required: true,
  },
  currency: String,
  imgUrl: {
    type: String,
    default: "Placeholder image link to be updated here ... ",
  },
});

const Smartphone = mongoose.model("Smartphone", smartphoneSchema);
module.exports = Smartphone;
