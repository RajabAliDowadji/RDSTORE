const express = require("express");
const { body } = require("express-validator");

const {
  getCartItems,
  addCartItem,
  removeCartItem,
  deleteCartItems,
  addBulkCartItems,
} = require("../controllers/Cart.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { userTokenValidation } = require("../validators/userTypeValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.get("/cart/items", tokenValidation, getCartItems);

router.post("/cart/add_item", tokenValidation, validation, addCartItem);

router.post("/cart/remove_item", tokenValidation, validation, removeCartItem);

router.post(
  "/cart/bulk/add_item",
  tokenValidation,
  validation,
  addBulkCartItems
);

router.delete("/cart/item/:id", idValidation, tokenValidation, deleteCartItems);

module.exports = router;
