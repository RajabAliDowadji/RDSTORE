const validator = require("aadhaar-validator");
const { COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.aadharNumberValidation = (req, resp, next) => {
  const aadhar_number = req.body.aadhar_number;
  if (validator.isValidNumber(`${aadhar_number}`)) {
    next();
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.AADHAR_NUMBER_ERROR.message));
  }
};
