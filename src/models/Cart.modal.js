const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = Schema(
  {
    id: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
        },
        unitId: {
          type: String,
          required: true,
        },
        price: { type: Number, required: false },
        quantity: { type: Number, required: false, default: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    activity: {
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
      },
      is_active: {
        type: Boolean,
        default: true,
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false }
);

CartSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("cart", CartSchema);
