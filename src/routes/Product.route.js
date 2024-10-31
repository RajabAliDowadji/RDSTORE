const express = require("express");
const { body } = require("express-validator");

const {
  addProduct,
  getProducts,
  getAdminProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/Product.controller");

const {
  productSubCategoryValidation,
  productBrandValidation,
  idValidation,
  commissionValidation,
} = require("../middlewares/IdValidation");

const { validation } = require("../validators/Validators");

const { tokenValidation } = require("../validators/tokenValidators");

const {
  rdAdminTokenValidation,
  adminTokenValidation,
} = require("../validators/userTypeValidators");

const router = express.Router();

router.get("/product", getProducts);

router.get(
  "/admin/product",
  tokenValidation,
  adminTokenValidation,
  getAdminProducts
);

router.get("/product/:id", getProductById);

router.get(
  "/admin/product/:id",
  tokenValidation,
  adminTokenValidation,
  getProductById
);

router.post(
  "/admin/product/create",
  tokenValidation,
  adminTokenValidation,
  [
    body("product_title").isString().trim().notEmpty(),
    body("product_price").isNumeric().isLength({ min: 1 }),
    body("product_MRP_price").isNumeric().isLength({ min: 1 }),
    body("product_description").isString().trim().notEmpty(),
    body("product_images").isArray({ min: 2 }),
  ],
  productSubCategoryValidation,
  productBrandValidation,
  validation,
  addProduct
);

router.put(
  "/admin/product/:id",
  idValidation,
  tokenValidation,
  adminTokenValidation,
  [
    body("product_title").isString().trim().notEmpty(),
    body("product_price").isNumeric().isLength({ min: 1 }),
    body("product_MRP_price").isNumeric().isLength({ min: 1 }),
    body("product_description").isString().trim().notEmpty(),
    body("product_images").isArray({ min: 2 }),
  ],
  validation,
  productSubCategoryValidation,
  productBrandValidation,
  updateProduct
);

router.delete(
  "/admin/product/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteProduct
);

module.exports = router;
