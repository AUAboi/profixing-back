const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    villNumber: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  total: {
    type: Number,
    required: true,
  },
  ServiceOrIssue: {
    type: String,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  onSurvey: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
