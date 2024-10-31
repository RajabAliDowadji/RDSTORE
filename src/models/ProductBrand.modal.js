const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductBrandSchema = Schema(
  {
    brand_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("product_brand", ProductBrandSchema);
