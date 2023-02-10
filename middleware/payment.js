const express = require("express");
const Route = express.Router();
const Payment = require("../model/paymentmodel");
const ErrorHandler = require("../utils/errorhandle");
const ApiFeatures = require("../utils/apifeatures");
const {
  isauthantication,
  authorizedRoles,
} = require("../middleware/authentication");
Route.post("/create", async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({
      success: true,
      payment,
    });
  } catch (e) {
    return next(new ErrorHandler("Product Not found" + e, 404));
  }
});



module.exports = Route;
