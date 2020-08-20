const express = require("express");
const Smartphone = require("../model/smartphone");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let smartphones = await Smartphone.find().sort({ name: "asc" });
    res.send(smartphones);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
