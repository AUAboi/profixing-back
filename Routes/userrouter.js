const express = require("express");
const Links = express.Router();
const ErrorHandler = require("../utils/errorhandle");
const User = require("../model/usermodel");
const sendTokens = require("../utils/jwttoken");
const jwt = require("jsonwebtoken");
const error = require("../middleware/error");
const sendEmail = require("../utils/sendemail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
// const sendToken = require("../utils/jwttoken");
// const isauthantication = require("../middleware/authentication");
Links.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(401).json("user already exist");
    } else {
      const newUser = new User(req.body);
      newUser.save((err, userData) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(userData);
        }
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
Links.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(404).json("User Not Found");
    }
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    res.status(200).json("{"sucess": true}")
  } catch (e) {
    res.status(500).json(e);
  }
});
Links.get("/logout", async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.json({
      success: true,
      message: "Log Out succees",
    });
    
  } catch (e) {
    res.status(500).json(e);
  }
});
Links.get("/forget", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const restToken = user.restpasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetpasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}user/resetpassword/${restToken}`;
    const message = `Your password reset token is :- \n\n ${resetpasswordUrl} \n\n if you have not requestd this email then please ignore it`;
    res.json(message);
  } catch (e) {
    res.status(500).json(e);
  }
});
Links.put("/resetpassword/:token", async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordexpire: { $gt: Date.now() },
    });
    if (req.body.password !== req.body.confirmpassword) {
      return next(new ErrorHandler(error.message, 404));
    }
    user.password = req.body.password;
    user.resetPasswordtoken = undefined;
    user.resetPasswordexpire = undefined;
    await user.save();
    sendTokens(user, 200, res);
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = Links;
