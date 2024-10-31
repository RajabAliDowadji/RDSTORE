const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MerchantBadgeSchema = Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    sales_min: {
      type: Number,
      required: true,
    },
    sales_max: {
      type: Number,
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

MerchantBadgeSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.update_at = new Date();

  next();
});

module.exports = mongoose.model("badge", MerchantBadgeSchema);
