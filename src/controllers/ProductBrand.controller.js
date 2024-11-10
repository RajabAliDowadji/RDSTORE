const ProductBrandModal = require("../models/ProductBrand.modal");
const { PROD_BRAND_API, COMMON } = require("../constants/Product.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createBrand = async (req, resp) => {
  const { name, image, website, country } = req.body;

  const productBrand = await ProductBrandModal.findOne({
    name: name,
    website: website,
  });
  if (!productBrand) {
    const productBrand = new ProductBrandModal({
      name: name,
      image: image,
      country: country,
      website: website,
    });

    await productBrand.save();

    const productBrandResponse = {
      ...productBrand.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_BRAND_API.PROD_BRAND_CREATE.message,
          productBrandResponse
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

module.exports.updateBrand = async (req, resp) => {
  const brandId = req.params.id;
  const { name, image, website, country } = req.body;
  const productBrand = await ProductBrandModal.findOne({
    id: brandId,
  });

  if (productBrand) {
    productBrand.name = name;
    productBrand.image = image;
    productBrand.website = website;
    productBrand.country = country;

    await productBrand.save();

    const productBrandResponse = {
      ...productBrand.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_BRAND_API.PROD_BRAND_UPDATE.message,
          productBrandResponse
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

module.exports.deleteBrand = async (req, resp) => {
  const brandId = req.params.id;
  const productBrand = await ProductBrandModal.findOne({
    id: brandId,
  });
  if (productBrand) {
    productBrand.activity = {
      ...productBrand.activity,
      is_deleted: true,
      is_active: false,
    };

    await productBrand.save();

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

module.exports.getBrands = async (req, resp) => {
  const productBrands = await ProductBrandModal.find().populate("image");
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
