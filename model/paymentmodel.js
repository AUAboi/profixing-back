const mongoose = require("mongoose");
const schema = mongoose.Schema;
const paymentSchema = schema({
  nameOfUser: {
    type: String,
    required: true,
  },
  nameofCard: {
    type: String,
    required: true,
  },
  Card_number: {
    type: Number,
    required: true,
  },
  Expiry_date: {
    type: Date,
    required: true,
  },
  Security_code: {
    type: Number,
    default: 0,
  },

  Postal_code: {
    type: String,
    required: true,
  },
});
module.exports = Payment = mongoose.model("product", paymentSchema);
