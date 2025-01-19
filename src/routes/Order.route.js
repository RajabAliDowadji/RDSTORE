const express = require("express");
const { body } = require("express-validator");

const { tokenValidation } = require("../validators/tokenValidators");
const {
  createOrder,
  getOrders,
  paymentSucessOrder,
  addressSuccessOrder,
  updateAddressOrder,
} = require("../controllers/Order.controller");
const { validation } = require("../validators/Validators");

const router = express.Router();

router.post("/create/order", tokenValidation, createOrder);

router.get("/get/orders", tokenValidation, getOrders);

router.post(
  "/add/payment",
  tokenValidation,
  [
    body("transition_id").isString().trim().notEmpty(),
    body("order_id").isString().trim().notEmpty(),
    body("paymentMethod").isString().trim().notEmpty(),
  ],
  validation,
  paymentSucessOrder
);

router.post(
  "/add/address",
  tokenValidation,
  [
    body("order_id").isString().trim().notEmpty(),
    body("address_id").isString().trim().notEmpty(),
  ],
  validation,
  addressSuccessOrder
);

router.put(
  "/update/order",
  tokenValidation,
  [
    body("order_id").isString().trim().notEmpty(),
    body("order_status").isString().trim().notEmpty(),
  ],
  validation,
  updateAddressOrder
);

module.exports = router;
