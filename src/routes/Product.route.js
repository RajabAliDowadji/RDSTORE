const express = require("express");
const { body } = require("express-validator");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  addProductUnit,
  updateProductUnit,
  deleteProductUnit,
} = require("../controllers/Product.controller");

const { validation } = require("../validators/Validators");

const { tokenValidation } = require("../validators/tokenValidators");

const { adminTokenValidation } = require("../validators/userTypeValidators");

const {
  superAdminAuthValidation,
} = require("../validators/SuperAdminTokenValidation");

const router = express.Router();

router.post(
  "/create/product",
  tokenValidation,
  adminTokenValidation,
  [
    body("profile").isString().trim().notEmpty(),
    body("category").isString().trim().notEmpty(),
    body("sub_category").isString().trim().notEmpty(),
  ],
  validation,
  addProduct
);

router.post(
  "/create/product/unit",
  tokenValidation,
  adminTokenValidation,
  [
    body("type").isString().trim().notEmpty(),
    body("product_id").isString().trim().notEmpty(),
    body("number").trim().notEmpty(),
    body("total_price").trim().notEmpty(),
    body("sales_price").trim().notEmpty(),
  ],
  validation,
  addProductUnit
);

router.put(
  "/update/product/:id",
  tokenValidation,
  adminTokenValidation,
  [
    body("profile").isString().trim().notEmpty(),
    body("category").isString().trim().notEmpty(),
    body("sub_category").isString().trim().notEmpty(),
  ],
  validation,
  updateProduct
);

router.put(
  "/update/product/unit/:id",
  tokenValidation,
  adminTokenValidation,
  [body("product_id").isString().trim().notEmpty()],
  validation,
  updateProductUnit
);

router.get("/get/products", getProducts);

router.delete("/delete/product/:id", superAdminAuthValidation, deleteProduct);

router.delete(
  "/delete/product/unit/:id",
  superAdminAuthValidation,
  deleteProductUnit
);

module.exports = router;
