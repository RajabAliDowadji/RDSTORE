const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const S3BucketSchema = Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    file_size: {
      type: Number,
      required: true,
    },
    file_key: {
      type: String,
      required: true,
    },
    file_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("file", S3BucketSchema);
