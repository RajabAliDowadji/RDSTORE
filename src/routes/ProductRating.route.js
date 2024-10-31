const express = require("express");
const { body } = require("express-validator");

const {
  getProductsRatings,
  addUpdateProductRatings,
} = require("../controllers/ProductRating.controller");

const {
  idValidation,
  productValidation,
} = require("../middlewares/IdValidation");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const router = express.Router();

router.get(
  "/ratings",
  tokenValidation,
  rdAdminTokenValidation,
  getProductsRatings
);

router.post("/product/rating", productValidation, addUpdateProductRatings);

module.exports = router;
