const express = require("express");
const Cart = require("../model/cart");
const Smartphone = require("../model/smartphone");
const router = express.Router();
const passport = require("passport");

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let user = req.user;
      let smartphone = await Smartphone.findById(req.params.id);
      let response = await Cart.create({
        userId: user.id,
        smartphone: smartphone,
      });
      return res.status(201).json({
        response: response,
        message: "successfully updated your cart",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let response = await Cart.find({ userId: req.user.id });
      return res.status(200).json({
        response: response,
        message: "success",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let response = await Cart.findById(req.params.id);
      return res.status(200).json({
        response: response,
        message: "success",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;
