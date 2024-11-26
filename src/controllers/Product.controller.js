const ProductModal = require("../models/Product.modal");
const { PROD_API, COMMON } = require("../constants/Product.messages");
const { STATUS, ACCOUNT_TYPE } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.addProduct = async (req, resp) => {
  const { profile, category, sub_category, brand, units } = req.body;
  const product = await ProductModal.findOne({
    profile,
  });
  if (!product) {
    const productModal = new ProductModal({
      profile,
      category,
      sub_category,
      brand,
      units,
      activity: {
        is_active: req.role === ACCOUNT_TYPE.SUPER_ADMIN,
      },
    });

    await productModal.save();

    const productResponse = {
      ...productModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_API.PROD_CREATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_ALREADY_REGISTER.message));
  }
};

module.exports.updateProduct = async (req, resp) => {
  const productId = req.params.id;
  const { profile, category, sub_category, brand, units } = req.body;
  const product = await ProductModal.findOne({ id: productId });
  if (product) {
    product.profile = profile;
    product.category = category;
    product.brand = brand;
    product.sub_category = sub_category;
    product.units = units;
    product.activity = {
      ...product.activity,
      is_active: req.role === ACCOUNT_TYPE.SUPER_ADMIN,
    };

    await product.save();

    const productResponse = {
      ...product.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_API.PROD_UPDATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};

module.exports.getProducts = async (req, resp) => {
  const products = await ProductModal.find()
    .populate("profile")
    .populate("category")
    .populate("brand")
    .populate("sub_category");

  if (products) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PROD_API.PROD_SUCCESS.message, products)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.deleteProduct = async (req, resp) => {
  const productId = req.params.id;
  const product = await ProductModal.findOne({ id: productId });
  if (product) {
    product.activity = {
      ...product.activity,
      is_deleted: true,
      is_active: false,
    };

    await product.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, PROD_API.PROD_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};
