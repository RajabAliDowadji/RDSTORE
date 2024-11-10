const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { PROD_SUB_CAT_API, COMMON } = require("../constants/Product.messages");
const ProductSubCategoriesModal = require("../models/ProductSubCategories.modal");

module.exports.addProductSubCategory = async (req, resp) => {
  const { name, image, category } = req.body;

  const prodSubCategory = await ProductSubCategoriesModal.findOne({
    name: name,
  });

  if (!prodSubCategory) {
    const prodSubCategory = new ProductSubCategoriesModal({
      name: name,
      image: image,
      category: category,
    });

    await prodSubCategory.save();

    const productSubCatResponse = {
      ...prodSubCategory.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_SUB_CAT_API.PROD_SUB_CAT_CREATE.message,
          productSubCatResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_SUB_CAT_API.PROD_SUB_CAT_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateProductSubCategory = async (req, resp) => {
  const subCategoryId = req.params.id;
  const name = req.body.name;
  const image = req.body.image;
  const category = req.body.category;
  const prodSubCategory = await ProductSubCategoriesModal.findOne({
    id: subCategoryId,
  });
  if (prodSubCategory) {
    prodSubCategory.name = name;
    prodSubCategory.image = image;
    prodSubCategory.category = category;

    await prodSubCategory.save();

    const productSubCatResponse = {
      ...prodSubCategory.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_SUB_CAT_API.PROD_SUB_CAT_UPDATE.message,
          productSubCatResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_SUB_CAT_API.PROD_SUB_CAT_INVALID_ID.message
        )
      );
  }
};

module.exports.getProductSubCategories = async (req, resp) => {
  const productSubCategories = await ProductSubCategoriesModal.find()
    .populate("category")
    .populate("image");

  if (productSubCategories) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_SUB_CAT_API.PROD_SUB_CAT_SUCCESS.message,
          productSubCategories
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.deleteProductSubCategory = async (req, resp, next) => {
  const subCategoryId = req.params.id;
  const prodSubCategory = await ProductSubCategoriesModal.findOne({
    id: subCategoryId,
  });

  if (prodSubCategory) {
    prodSubCategory.activity = {
      ...prodSubCategory.activity,
      is_deleted: true,
      is_active: false,
    };

    await prodSubCategory.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_SUB_CAT_API.PROD_SUB_CAT_DELETE.message
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_SUB_CAT_API.PROD_SUB_CAT_NOT_FOUND.message
        )
      );
  }
};
