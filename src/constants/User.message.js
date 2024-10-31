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
  USER_API: {
    USER_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    USER_CREATE: {
      message: "User created successfully.",
      status: 201,
    },
    USER_UPDATE: {
      message: "User updated successfully.",
      status: 200,
    },
    USER_ALREADY_REGISTER: {
      message: "User already existed.",
      status: 400,
    },
    USER_DELETE: {
      message: "User deleted successfully.",
      status: 200,
    },
    USER_NOT_FOUND: {
      message: "User not found.",
      status: 400,
    },
    USER_NOT_AUTHORIZED_FOUND: {
      message: "You are not authorized to perform this action.",
      status: 400,
    },
    USER_INVALID_ID: {
      message: "Please provide valid User id.",
      status: 400,
    },
  },
  USER_ADD_API: {
    USER_ADD_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    USER_ADD_CREATE: {
      message: "User address created successfully.",
      status: 201,
    },
    USER_ADD_UPDATE: {
      message: "User address updated successfully.",
      status: 200,
    },
    USER_ADD_ALREADY_REGISTER: {
      message: "User address already existed.",
      status: 400,
    },
    USER_ADD_DELETE: {
      message: "User address deleted successfully.",
      status: 200,
    },
    USER_ADD_NOT_FOUND: {
      message: "User not found.",
      status: 400,
    },
    USER_ADD_INVALID_ID: {
      message: "Please provide valid User address id.",
      status: 400,
    },
  },
  LOGIN_API: {
    LOGIN_API_SUCCESS: {
      message: "User login successfully.",
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
