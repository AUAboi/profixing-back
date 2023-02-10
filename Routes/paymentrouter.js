const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const Route = express.Router();
const ErrorHandler = require("../utils/errorhandle");
const { isauthantication } = require("../middleware/authentication");

Route.post("/process", isauthantication, async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (e) {
    res.status(500).json(e);
  }
});
Route.get("/getpayment", isauthantication, async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = Route;
