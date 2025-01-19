const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = Schema(
  {
    id: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: [
      {
        id: {
          type: Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        streetAddress: {
          type: String,
          required: true,
          trim: true,
        },
        otherDetails: {
          type: String,
          trim: true,
          default: null,
        },
        village: {
          type: String,
          trim: true,
          default: null,
        },
        place: {
          type: Schema.Types.ObjectId,
          ref: "place",
          required: true,
        },
        place_type: {
          type: String,
          enum: ["home", "office", "other"],
          default: "other",
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

AddressSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  this.activity.updated_at = new Date();

  next();
});

module.exports = mongoose.model("address", AddressSchema);
