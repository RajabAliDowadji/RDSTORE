const MerchantBadgeModal = require("../models/MerchantBadge.modal");
const { SHOP_BAD_API, COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createBadge = async (req, resp) => {
  const { name, sales_min, sales_max, image } = req.body;
  const badge = await MerchantBadgeModal.findOne({ name });
  if (!badge) {
    const badge = new MerchantBadgeModal({
      name: name,
      sales_min: sales_min,
      sales_max: sales_max,
      image: image,
    });
    await badge.save();
    const badgeResponse = {
      ...badge.toObject(),
      _id: undefined,
    };
    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SHOP_BAD_API.SHOP_BAD_CREATE.message,
          badgeResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          SHOP_BAD_API.SHOP_BAD_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateBadge = async (req, resp) => {
  const badgeId = req.params.id;
  const { name, sales_min, sales_max, image } = req.body;
  const badge = await MerchantBadgeModal.findOne({
    id: badgeId,
  });
  if (badge) {
    badge.name = name;
    badge.sales_min = sales_min;
    badge.sales_max = sales_max;
    badge.image = image;

    await badge.save();

    const badgeResponse = {
      ...badge.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SHOP_BAD_API.SHOP_BAD_UPDATE.message,
          badgeResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_BAD_API.SHOP_BAD_NOT_FOUND.message));
  }
};

module.exports.deleteBadge = async (req, resp, next) => {
  const badgeId = req.params.id;
  const badge = await MerchantBadgeModal.findOne({
    id: badgeId,
  });
  if (badge) {
    badge.activity = {
      ...badge.activity,
      is_deleted: true,
      is_active: false,
    };
    await badge.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_BAD_API.SHOP_BAD_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_BAD_API.SHOP_BAD_NOT_FOUND.message));
  }
};

module.exports.getBadges = async (req, resp, next) => {
  const badges = await MerchantBadgeModal.find();
  if (badges) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_BAD_API.SHOP_BAD_SUCCESS.message,
          badges
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
