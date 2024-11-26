const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductProfileSchema = Schema(
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
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["kg", "g", "pieces"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "discontinued"],
      default: "in_stock",
    },
    age_group: {
      type: String,
      enum: ["all", "teens", "adults", "seniors"],
      default: "all",
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "file",
        required: true,
      },
    ],
    main_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    tags: [
      {
        type: String,
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

ProductProfileSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("product_profile", ProductProfileSchema);
