const express = require("express");
const { body } = require("express-validator");

const {
  addShopCategories,
  getCategories,
  updateShopCategories,
  deleteShopCategories,
  getShopCategory,
} = require("../controllers/ShopCategories.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { RangeValidation } = require("../validators/RangeValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const router = express.Router();

router.get(
  "/shop_categories",
  tokenValidation,
  rdAdminTokenValidation,
  getCategories
);

router.get(
  "/shop_category/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  getShopCategory
);

router.post(
  "/shop_category/create",
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("category_name").trim().notEmpty(),
    body("lower_range").trim().isNumeric(),
    body("upper_range").trim().isNumeric(),
  ],
  RangeValidation,
  addShopCategories
);

router.put(
  "/shop_category/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("category_name").trim().notEmpty(),
    body("lower_range").trim().isNumeric(),
    body("upper_range").trim().isNumeric(),
  ],
  RangeValidation,
  updateShopCategories
);

router.delete(
  "/shop_category/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteShopCategories
);

module.exports = router;
