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
      message: "Cart added successfully.",
      status: 201,
    },
    CART_REMOVE: {
      message: "Cart remove successfully.",
      status: 201,
    },
    CART_UPDATE: {
      message: "Cart updated successfully.",
      status: 200,
    },
    CART_ALREADY_REGISTER: {
      message: "Cart already existed.",
      status: 400,
    },
    CART_DELETE: {
      message: "Cart item deleted successfully.",
      status: 200,
    },
    CART_NOT_FOUND: {
      message: "Cart not found.",
      status: 400,
    },
    CART_INVALID_ID: {
      message: "Please provide valid Cart id.",
      status: 400,
    },
  },
};
