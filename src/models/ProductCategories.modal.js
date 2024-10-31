const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductCategoriesSchema = Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("product_categories", ProductCategoriesSchema);
