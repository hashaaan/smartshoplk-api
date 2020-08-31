const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/user");

const passport = require("passport");
const config = require("../config/database");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // check the email excist on the request body
  console.log("receved email", req.body.email);
  if (!req.body.email) {
    return res.status(422).json({ message: "email is required" });
  }

  //check the username exsists in the request body
  if (!req.body.username) {
    return res.status(422).json({ message: "username is required" });
  }
  //check the password excists in the reqest body
  if (!req.body.password) {
    return res.status(422).json({ message: "password is required" });
  }

  try {
    //check that email already excist in the db
    let isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res.status(409).json({ message: "email is already registerd" });
    }
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    const newUser = await user.save();
    let token = generateUserToken(user);
    res
      .status(201)
      .json({ user: newUser, message: "successfully created", token: token });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "invalid email or passowrd",
      });
    } else if (isValidPassword) {
      let token = generateUserToken(user);
      res.status(200).json({ success: true, token: token });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  res.status(200).json({ user: req.user });
});

generateUserToken = function (user) {
  var token = jwt.sign(user.toJSON(), config.secret);
  return "JWT " + token;
};

module.exports = router;
