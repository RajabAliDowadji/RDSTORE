const express = require("express");
const { body } = require("express-validator");

const { createBadge } = require("../controllers/MerchantBadge.controller");

// const {
//   superadminAuthValidation,
// } = require("../validators/SuperAdminTokenValidation");

const { idValidation } = require("../middlewares/IdValidation");

const { salesRangeValidation } = require("../validators/RangeValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const router = express.Router();

router.post(
  "/create/badge",
  [
    body("name").isString().trim().notEmpty(),
    body("sales_min").trim().isNumeric(),
    body("sales_max").trim().isNumeric(),
    body("image").isString().trim().notEmpty(),
  ],
  salesRangeValidation,
  createBadge
);

// router.get("/get_shop_badges", superadminAuthValidation, getShopBadges);

// router.get(
//   "/get_shop_badge/:id",
//   idValidation,
//   superadminAuthValidation,
//   getShopBadgeById
// );

// router.put(
//   "/edit_shop_badge/:id",
//   superadminAuthValidation,
//   [
//     body("badge_name").isString().trim().notEmpty(),
//     body("min_range").trim().isNumeric(),
//     body("max_range").trim().isNumeric(),
//     body("badge_img").isString().trim().notEmpty(),
//   ],
//   RangeValidation,
//   updateShopBadge
// );

// router.delete(
//   "/shop_badge/:id",
//   idValidation,
//   superadminAuthValidation,
//   deleteShopBadge
// );

module.exports = router;
