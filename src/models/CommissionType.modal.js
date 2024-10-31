const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommissionTypeSchema = Schema(
  {
    commission_name: {
      type: String,
      required: true,
    },
    commission_sign: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("commission_type", CommissionTypeSchema);
