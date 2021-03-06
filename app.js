const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const home = require("./route/home");
const smartphones = require("./route/smartphones");
const bodyParser = require("body-parser");
const users = require("./route/users");
const admin = require("./route/admin");
const cart = require("./route/cart");
const order = require("./route/order");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/", home);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/smartphones", smartphones);
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/cart", cart);
app.use("/api/order", order);

mongoose
  .connect(
    "mongodb+srv://root:firefly@cluster0.rnzko.gcp.mongodb.net/smartshopdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Db successfully ... "))
  .catch((err) =>
    console.log("Error has occured while connecting to db : ", err)
  );

app.listen(PORT, () => {
  console.log("Listning on Port : " + PORT);
});
