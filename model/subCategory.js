const mongoose = require("mongoose");
const schema = mongoose.Schema;
const SubCategorySchema = schema({
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },

  detail: {
    type: String,
    required: true,
  },
});
module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
