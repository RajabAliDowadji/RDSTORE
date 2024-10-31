const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = Schema(
  {
    shop_name: {
      type: String,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    optional_number: {
      type: String,
      required: false,
    },
    aadhar_number: {
      type: String,
      required: true,
    },
    second_owner_name: {
      type: String,
      required: false,
    },
    second_owner_number: {
      type: String,
      required: false,
    },
    owner_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    owner_aadhar_card: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    shop_image: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "place",
      required: true,
    },
    shop_category: {
      type: Schema.Types.ObjectId,
      ref: "shop_categories",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("shop", ShopSchema);
