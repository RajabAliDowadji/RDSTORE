const express = require("express");
const { body } = require("express-validator");

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
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
    body("units").isArray({ min: 1 }),
  ],
  validation,
  addProduct
);

router.put(
  "/update/product/:id",
  tokenValidation,
  adminTokenValidation,
  [
    body("profile").isString().trim().notEmpty(),
    body("category").isString().trim().notEmpty(),
    body("sub_category").isString().trim().notEmpty(),
    body("units").isArray({ min: 1 }),
  ],
  validation,
  updateProduct
);

router.get("/get/products", getProducts);

router.delete("/delete/product/:id", superAdminAuthValidation, deleteProduct);

module.exports = router;
