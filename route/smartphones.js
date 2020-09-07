const express = require("express");
const Smartphone = require("../model/smartphone");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let smartphones = await Smartphone.find().sort({ createdAt: -1 });
    res.send(smartphones);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let response = await Smartphone.findById(req.params.id);
    return res.status(200).json({
      response: response,
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
