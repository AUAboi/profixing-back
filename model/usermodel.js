const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const schema = mongoose.Schema;
const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please enter email"],
  },
  password: {
    type: String,
    required: true,
    minLenth: 8,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
