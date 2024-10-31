const { fileDelete } = require("../middlewares/fileUpload");
const S3BucketModal = require("../models/S3Bucket.modal");

module.exports.multipleDeleteFile = async (deleteFile) => {
  const ids = deleteFile.map((file) => file._id);
  const keys = deleteFile.map((file) => file.file_key);
  await keys.map(async (key) => {
    await fileDelete(key);
  });
  await ids.map(async (id) => {
    await S3BucketModal.findByIdAndRemove({ _id: id });
  });
};
