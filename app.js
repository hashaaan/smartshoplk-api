const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const home = require("./route/home");
const smartphones = require("./route/smartphones");
const admin = require("./route/admin")
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/", home);
//app.use("/api/smartphones", smartphones);
app.use("/api/admin",admin );

mongoose
  .connect("mongodb://localhost/smartshopdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Db successfully ... "))
  .catch((err) =>
    console.log("Error has occured while connecting to db : ", err)
  );

app.listen(PORT, () => {
  console.log("Listning on Port : " + PORT);
});
