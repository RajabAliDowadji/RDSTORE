const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = Schema(
  {
    town: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("place", PlaceSchema);
