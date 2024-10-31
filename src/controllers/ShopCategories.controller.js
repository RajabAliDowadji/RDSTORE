const ShopCategoriesModal = require("../models/ShopCategories.modal");
const { SHOP_CAT_API, COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getCategories = async (req, resp, next) => {
  const shopCategories = await ShopCategoriesModal.find();
  if (shopCategories) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_CAT_API.SHOP_CAT_SUCCESS.message,
          shopCategories
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getShopCategory = async (req, resp, next) => {
  const shopCategoryId = req.params.id;
  const shopCategoy = await ShopCategoriesModal.findOne({
    _id: shopCategoryId,
  });
  if (shopCategoy) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_CAT_API.SHOP_CAT_SUCCESS.message,
          shopCategoy
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addShopCategories = async (req, resp, next) => {
  const category_name = req.body.category_name;
  const lower_range = req.body.lower_range;
  const upper_range = req.body.upper_range;
  const category = await ShopCategoriesModal.findOne({ category_name });
  if (!category) {
    const category = new ShopCategoriesModal({
      category_name: category_name,
      lower_range: lower_range,
      upper_range: upper_range,
    });
    await category.save();
    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SHOP_CAT_API.SHOP_CAT_CREATE.message,
          category
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          SHOP_CAT_API.SHOP_CAT_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateShopCategories = async (req, resp, next) => {
  const shopCategoryId = req.params.id;
  const category_name = req.body.category_name;
  const lower_range = req.body.lower_range;
  const upper_range = req.body.upper_range;
  const category = await ShopCategoriesModal.findOne({ _id: shopCategoryId });
  if (category) {
    category.category_name = category_name;
    category.lower_range = lower_range;
    category.upper_range = upper_range;
    await category.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_CAT_API.SHOP_CAT_UPDATE.message,
          category
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, SHOP_CAT_API.SHOP_CAT_INVALID_ID.message)
      );
  }
};

module.exports.deleteShopCategories = async (req, resp, next) => {
  const shopCategoryId = req.params.id;
  const response = await ShopCategoriesModal.findOne({ _id: shopCategoryId });
  if (response) {
    await ShopCategoriesModal.findByIdAndRemove({ _id: shopCategoryId });
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_CAT_API.SHOP_CAT_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_CAT_API.SHOP_CAT_NOT_FOUND.message));
  }
};
