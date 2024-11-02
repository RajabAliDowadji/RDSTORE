const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopProfileSchema = Schema(
  {
    id: {
      type: String,
    },
    shop_name: {
      type: String,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    contact: {
      type: "object",
      properties: {
        phone_code: {
          type: String,
        },
        phone_number: {
          type: String,
          unique: true,
        },
        email: {
          type: "string",
          format: "email",
        },
        aadhar_number: {
          type: String,
          unique: true,
        },
      },
      required: ["phone_number", "phone_code", "aadhar_number", "email"],
    },
    location: {
      type: "object",
      properties: {
        address: {
          type: String,
          require: true,
        },
        zipCode: {
          type: Schema.Types.ObjectId,
          ref: "place",
          required: true,
        },
      },
      required: ["address", "zipCode"],
    },
    images: {
      type: "object",
      properties: {
        shop: {
          type: Schema.Types.ObjectId,
          ref: "file",
          required: true,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "file",
          required: true,
        },
        aadhar_number: {
          type: Schema.Types.ObjectId,
          ref: "file",
          required: true,
        },
      },
      required: ["shop", "owner", "aadhar_number"],
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

ShopProfileSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("shop_profile", ShopProfileSchema);
