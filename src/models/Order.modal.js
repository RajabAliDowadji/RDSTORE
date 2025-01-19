const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = Schema(
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
        price: { type: Number, required: false },
        quantity: { type: Number, required: false, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "cash_on_delivery"],
      default: "cash_on_delivery",
      required: false,
    },
    transitionId: {
      type: String,
      required: false,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: false,
      default: null,
    },
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

OrderSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("order", OrderSchema);
