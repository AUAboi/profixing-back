const mongoose = require("mongoose");
const schema = mongoose.Schema;
const offerSchema = schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  detail: {
    callout: {
      type: Number,
      default: 0,
    },
    ac: {
      type: Number,
      default: 0,
    },
    plumbing: {
      type: Number,
      default: 0,
    },
    electrical: {
      type: Number,
      default: 0,
    },
    handyman: {
      type: Number,
      default: 0,
    },
    spareParts: {
      type: Number,
      default: 0,
    },
  },
});
module.exports = Offer = mongoose.model("Offer", offerSchema);
