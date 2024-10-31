const ProductBrandModal = require("../models/ProductBrand.modal");
const { PROD_BRAND_API, COMMON } = require("../constants/Product.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getProductBrands = async (req, resp, next) => {
  const productBrands = await ProductBrandModal.find();
  if (productBrands) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_BRAND_API.PROD_BRAND_SUCCESS.message,
          productBrands
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getProductBrandById = async (req, resp, next) => {
  const productBrandId = req.params.id;
  const productBrand = await ProductBrandModal.findOne({
    _id: productBrandId,
  });
  if (productBrand) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_BRAND_API.PROD_BRAND_SUCCESS.message,
          productBrand
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addProductBrand = async (req, resp, next) => {
  const brand_name = req.body.brand_name;

  const prodctBrand = await ProductBrandModal.findOne({
    brand_name: brand_name,
  });
  if (!prodctBrand) {
    const prodctBrand = new ProductBrandModal({
      brand_name: brand_name,
    });

    await prodctBrand.save();

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_BRAND_API.PROD_BRAND_CREATE.message,
          prodctBrand
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_BRAND_API.PROD_BRAND_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateProductBrand = async (req, resp, next) => {
  const productBrandId = req.params.id;
  const brand_name = req.body.brand_name;
  const productBrand = await ProductBrandModal.findOne({
    _id: productBrandId,
  });
  if (productBrand) {
    productBrand.brand_name = brand_name;

    await productBrand.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_BRAND_API.PROD_BRAND_UPDATE.message,
          productBrand
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, PROD_BRAND_API.PROD_BRAND_INVALID_ID.message)
      );
  }
};

module.exports.deleteProductBrand = async (req, resp, next) => {
  const productBrandId = req.params.id;
  const productBrand = await ProductBrandModal.findOne({
    _id: productBrandId,
  });
  if (productBrand) {
    await ProductBrandModal.findByIdAndRemove({ _id: productBrandId });
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PROD_BRAND_API.PROD_BRAND_DELETE.message)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, PROD_BRAND_API.PROD_BRAND_NOT_FOUND.message)
      );
  }
};
