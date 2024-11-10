const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductBrandSchema = Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    website: {
      type: String,
      required: false,
      default: "",
    },
    country: {
      type: String,
      required: false,
      default: "IND",
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

ProductBrandSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("product_brand", ProductBrandSchema);
