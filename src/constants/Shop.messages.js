module.exports = {
  COMMON: {
    SERVER_ERROR: {
      message: "Something went wrong.",
      status: 500,
    },
    VALIDATE_ERROR: {
      message: "Upper range should be greater than lower range.",
      status: 400,
    },
    PHONE_NUMBER_ERROR: {
      message: "Please provide valid phone number.",
      status: 400,
    },
    AADHAR_NUMBER_ERROR: {
      message: "Please provide valid aadhar number.",
      status: 400,
    },
    BAD_REQUEST: {
      message: "please provide valid details.",
      status: 400,
    },
  },
  SHOP_BAD_API: {
    SHOP_BAD_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    SHOP_BAD_CREATE: {
      message: "Shop badge registered successfully.",
      status: 201,
    },
    SHOP_BAD_UPDATE: {
      message: "Shop badge updated successfully.",
      status: 200,
    },
    SHOP_BAD_ALREADY_REGISTER: {
      message: "Shop badge already existed.",
      status: 400,
    },
    SHOP_BAD_DELETE: {
      message: "Shop badge deleted successfully.",
      status: 200,
    },
    SHOP_BAD_NOT_FOUND: {
      message: "Shop badge not found.",
      status: 400,
    },
    SHOP_BAD_INVALID_ID: {
      message: "Please provide valid shop badge id.",
      status: 400,
    },
  },
  SHOP_API: {
    SHOP_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    SHOP_CREATE: {
      message: "Shop registered successfully.",
      status: 201,
    },
    SHOP_UPDATE: {
      message: "Shop updated successfully.",
      status: 200,
    },
    SHOP_ALREADY_REGISTER: {
      message: "Shop already existed.",
      status: 400,
    },
    SHOP_DELETE: {
      message: "Shop deleted successfully.",
      status: 200,
    },
    SHOP_NOT_FOUND: {
      message: "Shop not found.",
      status: 400,
    },
    SHOP_INVALID_ID: {
      message: "Please provide valid shop id.",
      status: 400,
    },
  },
};
