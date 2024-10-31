const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSubCategoriesSchema = Schema(
  {
    sub_category_name: {
      type: String,
      required: true,
    },
    sub_category_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    product_category: {
      type: Schema.Types.ObjectId,
      ref: "product_categories",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model(
  "product_sub_categories",
  ProductSubCategoriesSchema
);
