const mongoose = require("mongoose");
const { Schema } = mongoose;

const SuperAdminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    totalCommission: {
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
    shops: [
      {
        shop: {
          type: Schema.Types.ObjectId,
          ref: "shop",
        },
        shopName: {
          type: String,
        },
        numOrders: {
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
        commissionAmount: {
          type: Number,
          default: 0,
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

SuperAdminSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("super_admin", SuperAdminSchema);
