module.exports = {
  STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    BAD: 400,
    UNAUTHORIZE: 401,
    INTERNAL_SERVER: 500,
  },
  ROUTES: {
    ROOT: "/api",
    SUPER_ADMIN: "/rd_admin",
    SUPER_ADMIN_PRODUCT: "/rd_admin/product",
    PRODUCT: "/product",
    //TODO
    SHOP_ADMIN: "/shop_admin",
    ADMIN: "/admin",
    ADMIN_PRODUCT: "/admin/product",
  },
  ACCOUNT_TYPE: {
    USER: "user",
    SHIPPER: "shipper",
    SHOP_ADMIN: "shop_admin",
    SUPER_ADMIN: "rd_admin",
  },
  COMMON_ERROR: {
    SERVER_ERROR: {
      message: "Something went wrong",
      status: 500,
    },
    VALIDATE_ERROR: {
      message: "Bad request",
      status: 400,
    },
    INVALID_ID: {
      message: "Please provide valid id.",
      status: 400,
    },
    TOKEN_EXPIRED: {
      message: "Please provide valid token",
      status: 401,
    },
    SUCCESS: {
      message: "Ok",
      status: 200,
    },
    UNAUTHORIZE: {
      message: "You are not authorize to perform this action.",
      status: 401,
    },
    NOT_FOUND: {
      message: "not found.",
      status: 400,
    },
  },
};
