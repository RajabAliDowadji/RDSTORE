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
  COM_TYPE_API: {
    COM_TYPE_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    COM_TYPE_CREATE: {
      message: "Commission type added successfully.",
      status: 201,
    },
    COM_TYPE_UPDATE: {
      message: "Commission type updated successfully.",
      status: 200,
    },
    COM_TYPE_ALREADY_REGISTER: {
      message: "Commission type already existed.",
      status: 400,
    },
    COM_TYPE_DELETE: {
      message: "Commission type deleted successfully.",
      status: 200,
    },
    COM_TYPE_NOT_FOUND: {
      message: "Commission type not found.",
      status: 400,
    },
    COM_TYPE_INVALID_ID: {
      message: "Please provide valid Commission type id.",
      status: 400,
    },
  },
  COM_API: {
    COM_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    COM_CREATE: {
      message: "Commission added successfully.",
      status: 201,
    },
    COM_UPDATE: {
      message: "Commission updated successfully.",
      status: 200,
    },
    COM_ALREADY_REGISTER: {
      message: "Commission already existed.",
      status: 400,
    },
    COM_DELETE: {
      message: "Commission deleted successfully.",
      status: 200,
    },
    COM_NOT_FOUND: {
      message: "Commission not found.",
      status: 400,
    },
    COM_INVALID_ID: {
      message: "Please provide valid Commission id.",
      status: 400,
    },
  },
  ADM_COM_API: {
    ADM_COM_SUCCESS: {
      message: "Ok",
      status: 200,
    },
    ADM_COM_CREATE: {
      message: "Admin Commission added successfully.",
      status: 201,
    },
    ADM_COM_UPDATE: {
      message: "Admin Commission updated successfully.",
      status: 200,
    },
    ADM_COM_DELETE: {
      message: "Admin Commission deleted successfully.",
      status: 200,
    },
    ADM_COM_NOT_FOUND: {
      message: "Commission not found.",
      status: 400,
    },
    ADM_COM_INVALID_ID: {
      message: "Please provide valid Admin Commission id.",
      status: 400,
    },
  },
};
