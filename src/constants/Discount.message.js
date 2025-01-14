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
  DISCOUNT_API: {
    DISCOUNT_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    DISCOUNT_CREATE: {
      message: "Discount registered successfully.",
      status: 201,
    },
    DISCOUNT_UPDATE: {
      message: "Discount updated successfully.",
      status: 200,
    },
    DISCOUNT_ALREADY_REGISTER: {
      message: "Discount already existed.",
      status: 400,
    },
    DISCOUNT_DELETE: {
      message: "Discount deleted successfully.",
      status: 200,
    },
    DISCOUNT_NOT_FOUND: {
      message: "Discount not found.",
      status: 400,
    },
    DISCOUNT_INVALID_ID: {
      message: "Please provide valid discount id.",
      status: 400,
    },
  },
};
