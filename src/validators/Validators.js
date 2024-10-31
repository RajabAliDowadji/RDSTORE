const { validationResult } = require("express-validator");

const { STATUS, COMMON_ERROR } = require("../constants/Constants");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.validation = (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON_ERROR.VALIDATE_ERROR.message));
  }
  next();
};
