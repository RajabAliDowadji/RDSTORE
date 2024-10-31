const express = require("express");
const { body } = require("express-validator");

const {
  getUserOrder,
  placeOrder,
  getPaymentKey,
  orderPaymentVerify,
  shopAcceptOrder,
  shipperAcceptOrder,
  deliveredOrder,
} = require("../controllers/Order.controller");

const {
  userTokenValidation,
  shopUserTokenValidation,
  shipperLoginUserValidation,
} = require("../validators/userTypeValidators");

const { idValidation } = require("../middlewares/IdValidation");

const { tokenValidation } = require("../validators/tokenValidators");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post("/order/placed", tokenValidation, placeOrder);

router.get("/order/getkey", tokenValidation, getPaymentKey);

router.get("/user/order", tokenValidation, getUserOrder);

router.post("/order/payment/verify", orderPaymentVerify);

// Done

router.post(
  "/order/shop/accept/:id",
  idValidation,
  tokenValidation,
  shopUserTokenValidation,
  shopAcceptOrder
);

router.post(
  "/order/shipper/accept/:id",
  idValidation,
  tokenValidation,
  shipperLoginUserValidation,
  shipperAcceptOrder
);

router.post(
  "/order/delivered/:id",
  tokenValidation,
  shipperLoginUserValidation,
  deliveredOrder
);

module.exports = router;
