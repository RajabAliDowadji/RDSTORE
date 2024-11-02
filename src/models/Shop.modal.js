const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = Schema(
  {
    id: {
      type: String,
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shop_profile",
      required: true,
    },
    badge_id: {
      type: Schema.Types.ObjectId,
      ref: "badge",
      required: true,
    },
    numOrders: {
      type: Number,
      default: 0,
    },
    numSales: {
      type: Number,
      default: 0,
    },
    numReturns: {
      type: Number,
      default: 0,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalDeductions: {
      type: Number,
      default: 0,
    },
    netEarnings: {
      type: Number,
      default: 0,
    },
    commissionAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    orderRatios: {
      type: "object",
      properties: {
        success: {
          type: Number,
          default: 0,
        },
        pending: {
          type: Number,
          default: 0,
        },
        canceled: {
          type: Number,
          default: 0,
        },
      },
    },
    transactions: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: Date,
        },
        balanceBefore: {
          type: Number,
        },
        balanceAfter: {
          type: Number,
        },
      },
    ],
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

ShopSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("shop", ShopSchema);
