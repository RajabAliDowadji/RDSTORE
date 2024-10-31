const AdminCommissionModal = require("../models/AdminCommission.modal");
const { ADM_COM_API, COMMON } = require("../constants/Commission.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getAdminCommissions = async (req, resp, next) => {
  const adminCommissions = await AdminCommissionModal.find().populate(
    "shop_id"
  );
  if (adminCommissions) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          ADM_COM_API.ADM_COM_SUCCESS.message,
          adminCommissions
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getAdminCommissionById = async (req, resp, next) => {
  const commissionId = req.params.id;
  const adminCommission = await AdminCommissionModal.findOne({
    _id: commissionId,
  });
  if (adminCommission) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          ADM_COM_SUCCESS.ADM_COM_SUCCESS.message,
          adminCommission
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
