const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { PROD_PROF_API, COMMON } = require("../constants/Product.messages");
const ProductProfileModal = require("../models/ProductProfile.modal");

module.exports.addProductProfile = async (req, resp) => {
  const {
    name,
    description,
    weight,
    unit,
    status,
    images,
    main_image,
    tags,
    age_group,
  } = req.body;
  const productProfile = await ProductProfileModal.findOne({
    name,
  });
  if (!productProfile) {
    const productProfile = new ProductProfileModal({
      name,
      description,
      weight,
      unit,
      status,
      images,
      main_image,
      tags,
      age_group,
    });

    await productProfile.save();

    const productProfileResponse = {
      ...productProfile.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_PROF_API.PROD_PROF_CREATE.message,
          productProfileResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          PROD_PROF_API.PROD_PROF_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateProductProfile = async (req, resp) => {
  const productProfileId = req.params.id;
  const {
    name,
    description,
    weight,
    unit,
    status,
    images,
    main_image,
    tags,
    age_group,
  } = req.body;
  const productProfile = await ProductProfileModal.findOne({
    id: productProfileId,
  });
  if (productProfile) {
    productProfile.name = name;
    productProfile.description = description;
    productProfile.weight = weight;
    productProfile.unit = unit;
    productProfile.status = status;
    productProfile.images = images;
    productProfile.main_image = main_image;
    productProfile.tags = tags;
    productProfile.age_group = age_group;

    await productProfile.save();

    const productProfileResponse = {
      ...productProfile.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_PROF_API.PROD_PROF_UPDATE.message,
          productProfileResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, PROD_PROF_API.PROD_PROF_NOT_FOUND.message)
      );
  }
};

module.exports.deleteProductProfile = async (req, resp) => {
  const productProfileId = req.params.id;
  const productProfile = await ProductProfileModal.findOne({
    id: productProfileId,
  });
  if (productProfile) {
    productProfile.activity = {
      ...productProfile.activity,
      is_deleted: true,
      is_active: false,
    };

    await productProfile.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PROD_PROF_API.PROD_PROF_DELETE.message)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, PROD_PROF_API.PROD_PROF_NOT_FOUND.message)
      );
  }
};

module.exports.getProductProfiles = async (req, resp) => {
  const productProfiles = await ProductProfileModal.find()
    .populate("images")
    .populate("main_image");
  if (productProfiles) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_PROF_API.PROD_PROF_SUCCESS.message,
          productProfiles
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
