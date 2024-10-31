const express = require("express");
const { body } = require("express-validator");

const {
  addProductSubCategory,
  getProductSubCategories,
  updateProductSubCategory,
  deleteProductSubCategory,
  getProductSubCategoryById,
} = require("../controllers/ProductSubCategories.controller");

const {
  productCategoryValidation,
  idValidation,
} = require("../middlewares/IdValidation");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.get("/sub_categories", getProductSubCategories);

router.get("/sub_category/:id", idValidation, getProductSubCategoryById);

router.post(
  "/sub_category/create",
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("sub_category_name").isString().trim().notEmpty(),
    body("sub_category_image").isString().trim().notEmpty(),
    body("product_category").isString().trim().notEmpty(),
  ],
  validation,
  productCategoryValidation,
  addProductSubCategory
);

router.put(
  "/sub_category/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("sub_category_name").isString().trim().notEmpty(),
    body("sub_category_image").isString().trim().notEmpty(),
    body("product_category").isString().trim().notEmpty(),
  ],
  validation,
  productCategoryValidation,
  updateProductSubCategory
);

router.delete(
  "/sub_category/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteProductSubCategory
);

module.exports = router;
