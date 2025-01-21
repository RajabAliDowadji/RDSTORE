const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommissionSchema = Schema(
  {
    id: {
      type: String,
    },
    comm_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commission_type",
      required: true,
    },
    comm_amount: {
      type: Number,
      default: 0,
    },
    comm_target: {
      type: String,
      enum: [
        "product",
        "product_category",
        "product_sub_category",
        "product_brand",
      ],
      default: "product",
      require: true,
    },
    target_id: {
      type: String,
      required: true,
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

CommissionSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("commission", CommissionSchema);
