const express = require("express");
const { body } = require("express-validator");

const {
  createBadge,
  updateBadge,
  deleteBadge,
  getBadges,
} = require("../controllers/MerchantBadge.controller");

const { salesRangeValidation } = require("../validators/RangeValidators");

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

router.put(
  "/update/badge/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("sales_min").trim().isNumeric(),
    body("sales_max").trim().isNumeric(),
    body("image").isString().trim().notEmpty(),
  ],
  salesRangeValidation,
  updateBadge
);

router.delete("/delete/badge/:id", deleteBadge);

router.get("/get/badges", getBadges);

module.exports = router;
