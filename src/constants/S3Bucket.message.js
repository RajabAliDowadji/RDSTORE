module.exports = {
  COMMON: {
    SERVER_ERROR: {
      message: "Something went wrong.",
      status: 500,
    },
    BAD_REQUEST: {
      message: "please provide valid details.",
      status: 400,
    },
  },
  BUCKET_API: {
    BUCKET_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    BUCKET_CREATE: {
      message: "Image added successfully.",
      status: 201,
    },
    BUCKET_UPDATE: {
      message: "Image updated successfully.",
      status: 200,
    },
    BUCKET_DELETE: {
      message: "Image deleted successfully.",
      status: 200,
    },
    BUCKET_INVALID_ID: {
      message: "Please provide valid id.",
      status: 400,
    },
  },
};
