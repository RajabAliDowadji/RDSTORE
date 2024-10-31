const CommissionTypeModal = require("../models/CommissionType.modal");
const { COM_TYPE_API, COMMON } = require("../constants/Commission.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getCommissionTypes = async (req, resp, next) => {
  const commissionTypes = await CommissionTypeModal.find();
  if (commissionTypes) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COM_TYPE_API.COM_TYPE_SUCCESS.message,
          commissionTypes
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.getCommissionTypeById = async (req, resp, next) => {
  const commissionTypeId = req.params.id;
  const commissionType = await CommissionTypeModal.findOne({
    _id: commissionTypeId,
  });
  if (commissionType) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COM_TYPE_API.COM_TYPE_SUCCESS.message,
          commissionType
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.addCommissionType = async (req, resp, next) => {
  const commission_name = req.body.commission_name;
  const commissionType = await CommissionTypeModal.findOne({ commission_name });
  if (!commissionType) {
    const commissiontypemodal = new CommissionTypeModal(req.body);

    await commissiontypemodal.save();
    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          COM_TYPE_API.COM_TYPE_CREATE.message,
          commissiontypemodal
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          COM_TYPE_API.COM_TYPE_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateCommissionType = async (req, resp, next) => {
  const commissionTypeId = req.params.id;
  const { commission_name, commission_sign } = req.body;
  const commissionType = await CommissionTypeModal.findOne({
    _id: commissionTypeId,
  });
  if (commissionType) {
    commissionType.commission_name = commission_name;
    commissionType.commission_sign = commission_sign;

    await commissionType.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COM_TYPE_API.COM_TYPE_UPDATE.message,
          commissionType
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, COM_TYPE_API.COM_TYPE_INVALID_ID.message)
      );
  }
};

module.exports.deleteCommissionType = async (req, resp, next) => {
  const commissionTypeId = req.params.id;
  const response = await CommissionTypeModal.findOne({ _id: commissionTypeId });
  if (response) {
    await CommissionTypeModal.findByIdAndRemove({ _id: commissionTypeId });
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, COM_TYPE_API.COM_TYPE_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COM_TYPE_API.COM_TYPE_NOT_FOUND.message));
  }
};
