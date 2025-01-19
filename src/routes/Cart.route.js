const express = require("express");
const { body } = require("express-validator");

const { validation } = require("../validators/Validators");
const { tokenValidation } = require("../validators/tokenValidators");
const {
  createCart,
  addProductCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/Cart.controller");

const router = express.Router();

router.post(
  "/create/cart",
  tokenValidation,
  [
    body("product_id").isString().trim().notEmpty(),
    body("unit_id").isString().trim().notEmpty(),
  ],
  validation,
  createCart,
  addProductCart
);

router.put(
  "/update/cart",
  tokenValidation,
  [
    body("product_id").isString().trim().notEmpty(),
    body("unit_id").isString().trim().notEmpty(),
  ],
  validation,
  addProductCart
);

router.get("/get/cart/items", tokenValidation, getCartItems);

router.delete(
  "/delete/cart/item",
  tokenValidation,
  [
    body("product_id").isString().trim().notEmpty(),
    body("unit_id").isString().trim().notEmpty(),
  ],
  validation,
  removeCartItem
);

module.exports = router;
