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
  CART_API: {
    CART_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    CART_CREATE: {
      message: "Product added successfully.",
      status: 201,
    },
    CART_REMOVE: {
      message: "Product remove successfully.",
      status: 201,
    },
    CART_UPDATE: {
      message: "Product updated successfully.",
      status: 200,
    },
    CART_ALREADY_REGISTER: {
      message: "Product already existed.",
      status: 400,
    },
    CART_DELETE: {
      message: "Product deleted successfully.",
      status: 200,
    },
    CART_NOT_FOUND: {
      message: "Product not found.",
      status: 400,
    },
    CART_INVALID_ID: {
      message: "Please provide valid Product id.",
      status: 400,
    },
  },
};
