const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "<h1 style='margin-top: 40px;text-align: center;'>Smartshop.lk Web API</h1>"
  );
});

module.exports = router;
