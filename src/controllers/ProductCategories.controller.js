const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { PROD_CAT_API, COMMON } = require("../constants/Product.messages");
const ProductCategoriesModal = require("../models/ProductCategories.modal");

module.exports.addProductCategory = async (req, resp) => {
  const { name, image } = req.body;
  const productCategory = await ProductCategoriesModal.findOne({
    name,
  });
  if (!productCategory) {
    const productCategory = new ProductCategoriesModal({
      name: name,
      image: image,
    });

    await productCategory.save();

    const productCatResponse = {
      ...productCategory.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_CAT_API.PROD_CAT_CREATE.message,
          productCatResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_CAT_API.PROD_CAT_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateProductCategory = async (req, resp) => {
  const productCategoryId = req.params.id;
  const { name, image } = req.body;
  const productCategory = await ProductCategoriesModal.findOne({
    id: productCategoryId,
  });
  if (productCategory) {
    productCategory.name = name;
    productCategory.image = image;

    await productCategory.save();

    const productCatResponse = {
      ...productCategory.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_CAT_API.PROD_CAT_UPDATE.message,
          productCatResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, PROD_CAT_API.PROD_CAT_INVALID_ID.message)
      );
  }
};

module.exports.deleteProductCategory = async (req, resp) => {
  const productCategoryId = req.params.id;
  const productCategory = await ProductCategoriesModal.findOne({
    id: productCategoryId,
  });
  if (productCategory) {
    productCategory.activity = {
      ...productCategory.activity,
      is_deleted: true,
      is_active: false,
    };

    await productCategory.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, PROD_CAT_API.PROD_CAT_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_CAT_API.PROD_CAT_NOT_FOUND.message));
  }
};

module.exports.getProductCategories = async (req, resp) => {
  const productCategories = await ProductCategoriesModal.find().populate(
    "image"
  );
  if (productCategories) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_CAT_API.PROD_CAT_SUCCESS.message,
          productCategories
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
