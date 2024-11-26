const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    id: {
      type: String,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "product_profile",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "product_categories",
      required: true,
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "product_sub_categories",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "product_brand",
      required: false,
    },
    ratings: {
      average_rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      reviews_count: {
        type: Number,
        default: 0,
      },
    },
    units: [
      {
        unit_type: {
          type: String,
          enum: ["kg", "g", "pieces"],
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        total_price: {
          type: Number,
          required: true,
        },
        sales_price: {
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
        default: false,
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false }
);

ProductSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("product", ProductSchema);
