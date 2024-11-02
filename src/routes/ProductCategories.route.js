const express = require("express");
const { body } = require("express-validator");

const {
  addProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
} = require("../controllers/ProductCategories.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/category",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
  ],
  validation,
  addProductCategory
);

router.put(
  "/update/category/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
  ],
  validation,
  updateProductCategory
);

router.delete("/delete/category/:id", deleteProductCategory);

router.get("/get/categories", getProductCategories);

module.exports = router;
