const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopCategoriesSchema = Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    lower_range: {
      type: Number,
      required: true,
    },
    upper_range: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("shop_categories", ShopCategoriesSchema);
