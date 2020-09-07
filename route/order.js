const express = require("express");
const Order = require("../model/order");
const Cart = require("../model/cart");
const router = express.Router();
const passport = require("passport");
const validator = require("validator");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let orders = await Order.find({ userId: req.user.id }).sort({
        name: "asc",
      });
      res.send(orders);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let body = req.body;
      const user = req.user;
      if (!body.phoneNumber) {
        return res.status(422).json({ message: "Phone number is required" });
      }
      if (!body.email) {
        return res.status(422).json({ message: "Email address is required" });
      }
      if (!validator.isEmail(body.email)) {
        return res.status(422).json({ message: "Invalid email address" });
      }
      if (!validator.isInt(body.telephone)) {
        return res.status(422).json({ message: "Invalid phone number" });
      }
      if (!body.total) {
        return res.status(422).json({ message: "Total is required" });
      }
      if (!validator.isDecimal(body.total)) {
        return res.status(422).json({ message: "Invalid total" });
      }
      if (!body.firstName) {
        return res.status(422).json({ message: "First name is required" });
      }
      if (!body.lastName) {
        return res.status(422).json({ message: "Last name is required" });
      }
      if (!body.address) {
        return res.status(422).json({ message: "Address is required" });
      }
      if (!body.address.zip) {
        return res.status(422).json({ message: "Zip code is required" });
      }
      if (!body.paymentMethod) {
        return res.status(422).json({ message: "Payment method is required" });
      }

      const cart = await Cart.find({ userId: req.user.id });

      let order = new Order({
        userId: user.id,
        phoneNumber: body.phoneNumber,
        total: body.total,
        currency: body.currency,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        address: body.address,
        paymentMethod: body.paymentMethod,
        items: cart,
      });

      let response = await Order.create(order);

      res.status(201).json({ response: response, message: "Order created" });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

module.exports = router;
