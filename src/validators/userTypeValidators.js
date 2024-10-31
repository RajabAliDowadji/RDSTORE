const {
  STATUS,
  ACCOUNT_TYPE,
  COMMON_ERROR,
} = require("../constants/Constants");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.rdAdminValidation = async (req, resp, next) => {
  const { user_type } = req.body;
  if (user_type != ACCOUNT_TYPE.SUPER_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.rdAdminTokenValidation = async (req, resp, next) => {
  if (req.user_type != ACCOUNT_TYPE.SUPER_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.adminTokenValidation = async (req, resp, next) => {
  if (
    req.user_type != ACCOUNT_TYPE.SUPER_ADMIN &&
    req.user_type != ACCOUNT_TYPE.SHOP_ADMIN
  ) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shopAdminUserValidation = async (req, resp, next) => {
  const { user_type } = req.body;
  if (
    req.user_type != ACCOUNT_TYPE.SUPER_ADMIN ||
    user_type != ACCOUNT_TYPE.SHOP_ADMIN
  ) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shopAdminUserTokenValidation = async (req, resp, next) => {
  if (req.user_type != ACCOUNT_TYPE.SUPER_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shopUserTokenValidation = async (req, resp, next) => {
  if (req.user_type != ACCOUNT_TYPE.SHOP_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shipperUserValidation = async (req, resp, next) => {
  const { user_type } = req.body;
  if (
    req.user_type != ACCOUNT_TYPE.SHOP_ADMIN ||
    user_type != ACCOUNT_TYPE.SHIPPER
  ) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shipperLoginUserValidation = async (req, resp, next) => {
  if (req.user_type != ACCOUNT_TYPE.SHIPPER) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.shipperUserTokenValidation = async (req, resp, next) => {
  if (req.user_type != ACCOUNT_TYPE.SHOP_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};

module.exports.userValidation = async (req, resp, next) => {
  const { user_type } = req.body;
  if (user_type != ACCOUNT_TYPE.USER) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};
module.exports.userTokenValidation = async (req, resp, next) => {
  const { user_type } = req;
  if (user_type != ACCOUNT_TYPE.USER) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  } else {
    next();
  }
};
