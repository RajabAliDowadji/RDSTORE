const express = require("express");
const { body } = require("express-validator");

const {
  addProductSubCategory,
  getProductSubCategories,
  updateProductSubCategory,
  deleteProductSubCategory,
} = require("../controllers/ProductSubCategories.controller");

const { productCategoryValidation } = require("../middlewares/IdValidation");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/sub_category",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
    body("category").isString().trim().notEmpty(),
  ],
  validation,
  productCategoryValidation,
  addProductSubCategory
);

router.put(
  "/update/sub_category/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
    body("category").isString().trim().notEmpty(),
  ],
  validation,
  productCategoryValidation,
  updateProductSubCategory
);

router.get("/get/sub_categories", getProductSubCategories);

router.delete("/delete/sub_category/:id", deleteProductSubCategory);

module.exports = router;
