const ProductRatingModal = require("../models/ProductRating.modal");
const ProductModal = require("../models/Product.modal");
const { COMMON_ERROR } = require("../constants/Constants");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getProductsRatings = async (req, resp, next) => {
  const ProductRatings = await ProductRatingModal.find().populate({
    path: "product",
    populate: [
      {
        path: "product_brand",
      },
      {
        path: "product_sub_category",
      },
    ],
  });
  if (ProductRatings) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          COMMON_ERROR.SUCCESS.message,
          ProductRatings
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(
        apiResponse(STATUS.INTERNAL_SERVER, COMMON_ERROR.SERVER_ERROR.message)
      );
  }
};

module.exports.addUpdateProductRatings = async (req, resp, next) => {
  const productId = req.body.product;
  const productRating = req.body.rating;
  const ProductRating = await ProductRatingModal.findOne({
    product: productId,
  });
  if (ProductRating) {
    ProductRating.rating = productRating;
    await ProductRating.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, COMMON_ERROR.SUCCESS.message));
  }
};
