const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
const home = require("./route/home");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/", home);

app.listen(PORT, () => {
  console.log("Listning on Port : " + PORT);
});
