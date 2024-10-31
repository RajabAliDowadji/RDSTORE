const { STATUS } = require("../constants/Constants");
const { COMMON } = require("../constants/Place.messages");
const { errorResponse } = require("../helpers/errorResponse");
const { validationResult } = require("express-validator");

module.exports.pinCodeValidation = (req, resp, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.VALIDATE_ERROR.message));
  }
  next();
};
