require("dotenv").config();
const jwt = require("jsonwebtoken");
const { STATUS, COMMON_ERROR } = require("../constants/Constants");
const { errorResponse } = require("../helpers/errorResponse");
const { ACCOUNT_TYPE } = require("../constants/Constants");

module.exports.superAdminAuthValidation = async (req, resp, next) => {
  const token = req.get("token");
  if (!token) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.TOKEN_EXPIRED.message)
      );
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
  } catch (err) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.TOKEN_EXPIRED.message)
      );
  }
  if (!decodedToken) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  }
  req.role = decodedToken.role;
  req.id = decodedToken.id;
  if (req.role != ACCOUNT_TYPE.SUPER_ADMIN) {
    return resp
      .status(STATUS.UNAUTHORIZE)
      .send(
        errorResponse(STATUS.UNAUTHORIZE, COMMON_ERROR.UNAUTHORIZE.message)
      );
  }
  next();
};
