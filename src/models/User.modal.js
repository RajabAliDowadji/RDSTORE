const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { COMMON } = require("../constants/User.message");

const userSchema = Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      require: false,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return value || this.phone_number;
        },
      },
      message: COMMON.FIELD_ERROR.message,
    },
    phone_code: {
      type: String,
    },
    phone_number: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return value || this.email;
        },
      },
      message: COMMON.FIELD_ERROR.message,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["rd_admin", "shop_admin", "user", "shipper"],
      default: "user",
      required: true,
    },
    activity: {
      created_at: {
        type: Date,
        default: Date.now,
      },
      update_at: {
        type: Date,
      },
      is_blocked: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.update_at = new Date();

  next();
});

module.exports = mongoose.model("user", userSchema);
