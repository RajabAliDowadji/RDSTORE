const express = require("express");
const { body } = require("express-validator");

const {
  createDiscount,
  updateDiscount,
  getDiscounts,
  deleteDiscount,
} = require("../controllers/Discount.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/discount",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
    body("coupon_code").isString().trim().notEmpty(),
    body("description").isString().trim().notEmpty(),
    body("discount_type").isString().trim().notEmpty(),
    body("discount_value").isNumeric().notEmpty(),
    body("max_discount").isNumeric().notEmpty(),
    body("min_spend").isNumeric().notEmpty(),
    body("percentage_cap").isNumeric().notEmpty(),
    body("total_user").isNumeric().notEmpty(),
    body("products").isString().trim().notEmpty(),
    body("categories").isString().trim().notEmpty(),
    body("sub_categories").isString().trim().notEmpty(),
    body("brands").isString().trim().notEmpty(),
    body("start_date").isString().trim().notEmpty(),
    body("end_date").isString().trim().notEmpty(),
  ],
  validation,
  createDiscount
);

router.put(
  "/update/discount/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
    body("coupon_code").isString().trim().notEmpty(),
    body("description").isString().trim().notEmpty(),
    body("discount_type").isString().trim().notEmpty(),
    body("discount_value").isNumeric().notEmpty(),
    body("max_discount").isNumeric().notEmpty(),
    body("min_spend").isNumeric().notEmpty(),
    body("percentage_cap").isNumeric().notEmpty(),
    body("total_user").isNumeric().notEmpty(),
    body("products").isString().trim().notEmpty(),
    body("categories").isString().trim().notEmpty(),
    body("sub_categories").isString().trim().notEmpty(),
    body("brands").isString().trim().notEmpty(),
    body("start_date").isString().trim().notEmpty(),
    body("end_date").isString().trim().notEmpty(),
  ],
  validation,
  updateDiscount
);

router.get("/get/discounts", getDiscounts);

router.delete("/delete/discount/:id", deleteDiscount);

module.exports = router;
