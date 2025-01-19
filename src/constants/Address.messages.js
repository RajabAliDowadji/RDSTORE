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
  ADDRESS_API: {
    ADDRESS_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    ADDRESS_CREATE: {
      message: "Address registered successfully.",
      status: 201,
    },
    ADDRESS_UPDATE: {
      message: "Address updated successfully.",
      status: 200,
    },
    ADDRESS_ALREADY_REGISTER: {
      message: "Address already existed.",
      status: 400,
    },
    ADDRESS_DELETE: {
      message: "Address deleted successfully.",
      status: 200,
    },
    ADDRESS_NOT_FOUND: {
      message: "Address not found.",
      status: 400,
    },
    ADDRESS_INVALID_ID: {
      message: "Please provide valid address id.",
      status: 400,
    },
  },
};
