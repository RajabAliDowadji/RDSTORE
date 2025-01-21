const CommissionModal = require("../models/Commission.modal");
const {
  COM_API,
  COMMON,
  COM_TARGET,
} = require("../constants/Commission.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createCommission = async (req, resp) => {
  const { comm_type, target_id, comm_amount, comm_target } = req.body;
  const commission = await CommissionModal.findOne({
    comm_type: comm_type,
    comm_target: comm_target,
    target_id: target_id,
  });
  if (!commission) {
    const findedModel = COM_TARGET[comm_target];
    const isTargetExist = await findedModel.findOne({ id: target_id });

    if (!isTargetExist) {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, COM_API.COM_INVALID_ID.message));
    }

    const commission = new CommissionModal({
      comm_type: comm_type,
      comm_amount: comm_amount,
      target_id: target_id,
      comm_target: comm_target,
    });

    await commission.save();

    const commissionResponse = {
      ...commission.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          COM_API.COM_CREATE.message,
          commissionResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COM_API.COM_ALREADY_REGISTER.message));
  }
};

module.exports.updateCommission = async (req, resp) => {
  const commission_id = req.params.id;
  const { comm_type, target_id, comm_amount, comm_target } = req.body;
  const commission = await CommissionModal.findOne({
    id: commission_id,
  });

  if (commission) {
    const findedModel = COM_TARGET[comm_target];
    const isTargetExist = await findedModel.findOne({ id: target_id });

    if (!isTargetExist) {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, COM_API.COM_INVALID_ID.message));
    }

    commission.comm_target = comm_target;
    commission.comm_type = comm_type;
    commission.target_id = target_id;
    commission.comm_amount = comm_amount;

    await commission.save();

    const commissionResponse = {
      ...commission.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COM_API.COM_UPDATE.message,
          commissionResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COM_API.COM_INVALID_ID.message));
  }
};

module.exports.deleteCommission = async (req, resp) => {
  const commission_id = req.params.id;
  const commission = await CommissionModal.findOne({
    id: commission_id,
  });
  if (commission) {
    commission.activity = {
      ...commission.activity,
      is_deleted: true,
      is_active: false,
    };

    await commission.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, COM_API.COM_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COM_API.COM_NOT_FOUND.message));
  }
};

module.exports.getCommissions = async (req, resp) => {
  const { comm_target } = req.query;
  const commissions = await CommissionModal.find({ comm_target: comm_target });
  if (commissions) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, COM_API.COM_SUCCESS.message, commissions)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
