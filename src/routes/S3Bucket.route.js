const express = require("express");
const {
  addBucketImage,
  uploadMultipleImages,
  deleteBucketImage,
} = require("../controllers/S3Bucket.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { fileUpload } = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/file/upload", fileUpload.single("file"), addBucketImage);

router.post("/files/upload", fileUpload.array("file"), uploadMultipleImages);

router.delete("/file/:id", idValidation, deleteBucketImage);

module.exports = router;
