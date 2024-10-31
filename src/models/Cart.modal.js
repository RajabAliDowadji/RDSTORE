const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cart_items: [
      {
        product_qty: {
          type: Number,
          required: false,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("cart", CartSchema);
