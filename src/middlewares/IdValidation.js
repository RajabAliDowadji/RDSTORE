const mongoose = require("mongoose");
const ProductCategoriesModal = require("../models/ProductCategories.modal");
const ProductSubCategoriesModal = require("../models/ProductSubCategories.modal");
const ProductBrandModal = require("../models/ProductBrand.modal");
const ProductModal = require("../models/Product.modal");
const CommissionTypeModal = require("../models/CommissionType.modal");
const CommissionModal = require("../models/Commission.modal");

const { STATUS, COMMON_ERROR } = require("../constants/Constants");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.idValidation = (req, resp, next) => {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    next();
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON_ERROR.INVALID_ID.message));
  }
};

module.exports.productCategoryValidation = async (req, resp, next) => {
  const id = req.body.product_category;
  if (mongoose.isValidObjectId(id)) {
    const prodCategory = await ProductCategoriesModal.findOne({ _id: id });
    if (prodCategory) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            "Product category " + COMMON_ERROR.NOT_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON_ERROR.INVALID_ID.message));
  }
};

module.exports.productSubCategoryValidation = async (req, resp, next) => {
  const id = req.body.product_sub_category;
  if (mongoose.isValidObjectId(id)) {
    const prodSubCategory = await ProductSubCategoriesModal.findOne({
      _id: id,
    });
    if (prodSubCategory) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            "Product sub-category " + COMMON_ERROR.NOT_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON_ERROR.INVALID_ID.message));
  }
};

module.exports.productBrandValidation = async (req, resp, next) => {
  const id = req.body.product_brand;
  if (mongoose.isValidObjectId(id)) {
    const prodBrand = await ProductBrandModal.findOne({
      _id: id,
    });
    if (prodBrand) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            "Product brand " + COMMON_ERROR.NOT_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON_ERROR.INVALID_ID.message));
  }
};

module.exports.productValidation = async (req, resp, next) => {
  const id = req.body.product;
  if (mongoose.isValidObjectId(id)) {
    const product = await ProductModal.findOne({
      _id: id,
    });
    if (product) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(STATUS.BAD, "Product " + COMMON_ERROR.NOT_FOUND.message)
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          COMMON_ERROR.SUCCESS + COMMON_ERROR.INVALID_ID.message
        )
      );
  }
};

module.exports.commissionTypeValidation = async (req, resp, next) => {
  const id = req.body.commission_type;
  if (mongoose.isValidObjectId(id)) {
    const commissionType = await CommissionTypeModal.findOne({
      _id: id,
    });
    if (commissionType) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            "Commission type " + COMMON_ERROR.NOT_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          COMMON_ERROR.SUCCESS + COMMON_ERROR.INVALID_ID.message
        )
      );
  }
};

module.exports.commissionValidation = async (req, resp, next) => {
  const id = req.body.commission;
  if (mongoose.isValidObjectId(id)) {
    const commission = await CommissionModal.findOne({
      _id: id,
    });
    if (commission) {
      next();
    } else {
      return resp
        .status(STATUS.BAD)
        .send(
          errorResponse(
            STATUS.BAD,
            "Commission " + COMMON_ERROR.NOT_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          COMMON_ERROR.SUCCESS + COMMON_ERROR.INVALID_ID.message
        )
      );
  }
};
