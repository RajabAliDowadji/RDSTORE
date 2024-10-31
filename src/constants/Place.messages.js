module.exports = {
  COMMON: {
    SERVER_ERROR: {
      message: "Something went wrong.",
      status: 500,
    },
    VALIDATE_ERROR: {
      message: "Please provide valid pincode.",
      status: 400,
    },
  },
  PLACE_API: {
    PLACE_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    PLACE_CREATE: {
      message: "Place registered successfully.",
      status: 201,
    },
    PLACE_UPDATE: {
      message: "Place updated successfully.",
      status: 200,
    },
    PLACE_ALREADY_REGISTER: {
      message: "Place already existed.",
      status: 400,
    },
    PLACE_DELETE: {
      message: "Place deleted successfully.",
      status: 200,
    },
    PLACE_NOT_FOUND: {
      message: "Place not found.",
      status: 400,
    },
    PLACE_INVALID_ID: {
      message: "Please provide valid place id.",
      status: 400,
    },
  },
};
