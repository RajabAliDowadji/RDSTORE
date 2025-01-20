const CommissionTypeModal = require("../models/CommissionType.modal");
const { COM_TYPE_API, COMMON } = require("../constants/Commission.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createCommissionType = async (req, resp) => {
  const { name, sign } = req.body;
  const commissionType = await CommissionTypeModal.findOne({
    name: name,
    sign: sign,
  });
  if (!commissionType) {
    const commissionType = new CommissionTypeModal({
      name: name,
      sign: sign,
    });

    await commissionType.save();

    const commissionTypeResponse = {
      ...commissionType.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          COM_TYPE_API.COM_TYPE_CREATE.message,
          commissionTypeResponse
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

module.exports.updateCommissionType = async (req, resp) => {
  const commissionTypeId = req.params.id;
  const { name, sign } = req.body;
  const commissionType = await CommissionTypeModal.findOne({
    id: commissionTypeId,
  });

  if (commissionType) {
    commissionType.name = name;
    commissionType.sign = sign;

    await commissionType.save();

    const commissionTypeResponse = {
      ...commissionType.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COM_TYPE_API.COM_TYPE_UPDATE.message,
          commissionTypeResponse
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

module.exports.getCommissionTypes = async (req, resp) => {
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

module.exports.deleteCommissionType = async (req, resp) => {
  const commissionId = req.params.id;
  const commissionType = await CommissionTypeModal.findOne({
    id: commissionId,
  });
  if (commissionType) {
    commissionType.activity = {
      ...commissionType.activity,
      is_deleted: true,
      is_active: false,
    };

    await commissionType.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, COM_TYPE_API.COM_TYPE_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COM_TYPE_API.COM_TYPE_NOT_FOUND.message));
  }
};
