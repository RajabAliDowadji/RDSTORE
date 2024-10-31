const express = require("express");
const { body } = require("express-validator");

const {
  addProductBrand,
  getProductBrands,
  updateProductBrand,
  deleteProductBrand,
  getProductBrandById,
} = require("../controllers/ProductBrand.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.get(
  "/brands",
  tokenValidation,
  rdAdminTokenValidation,
  getProductBrands
);

router.get(
  "/brand/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  getProductBrandById
);

router.post(
  "/brand/create",
  tokenValidation,
  rdAdminTokenValidation,
  [body("brand_name").isString().trim().notEmpty()],
  validation,
  addProductBrand
);

router.put(
  "/brand/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [body("brand_name").isString().trim().notEmpty()],
  validation,
  updateProductBrand
);

router.delete(
  "/brand/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteProductBrand
);

module.exports = router;
