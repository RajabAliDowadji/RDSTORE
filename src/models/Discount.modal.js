const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "file",
    },
    coupon_code: {
      type: String,
    },
    discount_detail: {
      type: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      max_discount: {
        type: Number,
        default: 0,
      },
    },
    conditions: {
      min_spend: {
        type: Number,
        required: true,
      },
      percentage_cap: {
        type: Number,
        default: 100,
      },
    },
    applicable_items: {
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
      categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product_categories",
        },
      ],
      sub_categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product_sub_categories",
        },
      ],
      brands: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product_brand",
        },
      ],
    },
    validity: {
      start_date: {
        type: Date,
        required: true,
      },
      end_date: {
        type: Date,
        required: true,
      },
    },
    usage_limit: {
      per_user: {
        type: Number,
        default: 1,
      },
      total_user: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
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

DiscountSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("discount", DiscountSchema);
