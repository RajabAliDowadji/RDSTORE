require("dotenv").config();

const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

const bucketname = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_BUCKET_ACCESS_KEY;
const secretaccessKeyId = process.env.AWS_S3_BUCKET_SECRET_KEY;

// create a bucket instance start
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretaccessKeyId,
  },
  region: region,
});
// create a bucket instance end

//multer storage start
const s3Storage = multerS3({
  s3: s3,
  bucket: bucketname,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});
//multer storage end

// filter a file which type of file you want to upload start
const filterFile = (file, cb) => {
  const fileExts = [".png", ".jpg", ".jpeg"];
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
};
// filter a file which type of file you want to upload end

// upload a file into bucket start
module.exports.fileUpload = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    filterFile(file, callback);
  },
  limits: {
    fileSize: 5242880, // 5 MB file allowed to upload
  },
});
// upload a file into bucket end

// delete a file in bucket start
module.exports.fileDelete = (filename) => {
  const deleteParams = {
    Bucket: bucketname,
    Key: filename,
  };

  return s3.send(new DeleteObjectCommand(deleteParams));
};
// delete a file in bucket end
