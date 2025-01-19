module.exports = {
  COMMON: {
    SERVER_ERROR: {
      message: "Something went wrong.",
      status: 500,
    },
    PHONE_NUMBER_ERROR: {
      message: "Please provide valid phone number.",
      status: 400,
    },
    BAD_REQUEST: {
      message: "please provide valid details.",
      status: 400,
    },
    PASSWORD_ERROR: {
      message: "Please enter correct password.",
      status: 400,
    },
    FIELD_ERROR: {
      message: "Either email or phone number must be provided.",
      status: 400,
    },
  },
  SUPER_ADMIN_API: {
    SUPER_ADMIN_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    SUPER_ADMIN_CREATE: {
      message: "Admin created successfully.",
      status: 201,
    },
    SUPER_ADMIN_UPDATE: {
      message: "Admin updated successfully.",
      status: 200,
    },
    SUPER_ADMIN_ALREADY_REGISTER: {
      message: "Admin already existed.",
      status: 400,
    },
    SUPER_ADMIN_DELETE: {
      message: "Admin deleted successfully.",
      status: 200,
    },
    SUPER_ADMIN_NOT_FOUND: {
      message: "Admin not found.",
      status: 400,
    },
    SUPER_ADMIN_NOT_AUTHORIZED_FOUND: {
      message: "You are not authorized to perform this action.",
      status: 400,
    },
    SUPER_ADMIN_INVALID_ID: {
      message: "Please provide valid admin id.",
      status: 400,
    },
    SUPER_ADMIN_SHOP_ADD: {
      message: "Shop added successfully.",
      status: 201,
    },
    SUPER_ADMIN_SHOP_DELETE: {
      message: "Shop deleted successfully.",
      status: 201,
    },
    SUPER_ADMIN_SHOP_NOT_FOUND: {
      message: "Shop not found.",
      status: 400,
    },
    SUPER_ADMIN_INVALID_SHOP: {
      message: "Shop already exists in the Admin record.",
      status: 400,
    },
  },
  SUPER_ADMIN_ADD_API: {
    SUPER_ADMIN_ADD_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    SUPER_ADMIN_ADD_CREATE: {
      message: "Admin address created successfully.",
      status: 201,
    },
    SUPER_ADMIN_ADD_UPDATE: {
      message: "Admin address updated successfully.",
      status: 200,
    },
    SUPER_ADMIN_ADD_ALREADY_REGISTER: {
      message: "Admin address already existed.",
      status: 400,
    },
    SUPER_ADMIN_ADD_DELETE: {
      message: "Admin address deleted successfully.",
      status: 200,
    },
    SUPER_ADMIN_ADD_NOT_FOUND: {
      message: "Admin not found.",
      status: 400,
    },
    SUPER_ADMIN_ADD_INVALID_ID: {
      message: "Please provide valid admin address id.",
      status: 400,
    },
  },
  LOGIN_API: {
    LOGIN_API_SUCCESS: {
      message: "Admin login successfully.",
      status: 200,
    },
  },
  RESET_PSWD_API: {
    RESET_PSWD_SUCCESS: {
      message: "ok.",
      status: 200,
    },
    RESET_CONF_PSWD_SUCCESS: {
      message: "Your password changed successfully.",
      status: 200,
    },
  },
};
