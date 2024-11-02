const ShopModal = require("../models/Shop.modal");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { SHOP_API, COMMON } = require("../constants/Shop.messages");

module.exports.addShop = async (req, resp) => {
  const { shop_id, badge_id } = req.body;
  const shop = await ShopModal.findOne({
    shop_id: shop_id,
  });

  if (!shop) {
    const shopModal = new ShopModal({
      shop_id: shop_id,
      badge_id: badge_id,
    });

    await shopModal.save();

    const shopModalResponse = {
      ...shopModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SHOP_API.SHOP_CREATE.message,
          shopModalResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_ALREADY_REGISTER.message));
  }
};

module.exports.getShops = async (req, resp) => {
  const shops = await ShopModal.find().populate("shop_id").populate("badge_id");
  if (shops) {
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_SUCCESS.message, shops));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.updateShop = async (req, resp) => {
  const shopId = req.params.id;
  const { shop_id, badge_id } = req.body;
  const shop = await ShopModal.findOne({ id: shopId });
  if (shop) {
    shop.shop_id = shop_id;
    shop.badge_id = badge_id;

    await shop.save();

    const shopModalResponse = {
      ...shop.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_API.SHOP_UPDATE.message,
          shopModalResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_INVALID_ID.message));
  }
};

module.exports.deleteShop = async (req, resp) => {
  const shopId = req.params.id;
  const shop = await ShopModal.findOne({ id: shopId });
  if (shop) {
    shop.activity = {
      ...shop.activity,
      is_deleted: true,
      is_active: false,
    };
    await shop.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_NOT_FOUND.message));
  }
};
