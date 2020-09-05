const mongoose = require("mongoose");

const smartphoneSchema = new mongoose.Schema(
  {
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
    currency: {
      type: String,
      default: "LKR",
    },
    imgUrl: {
      type: String,
      default: "https://www.zatista.ie/sitemap/email-images/300x300.jpg",
    },
  },
  { timestamps: true }
);

const Smartphone = mongoose.model("Smartphone", smartphoneSchema);
module.exports = Smartphone;
