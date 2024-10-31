const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminCommissionSchema = Schema(
  {
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      require: true,
    },
    orders_count: {
      type: Number,
      default: 0,
    },
    total_payments: {
      type: Number,
      default: 0,
    },
    total_commissions: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("admin_commission", AdminCommissionSchema);
