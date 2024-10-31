const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductRatingSchema = Schema(
  {
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("product_rating", ProductRatingSchema);
