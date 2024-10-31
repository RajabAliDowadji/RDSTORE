const express = require("express");
const { body } = require("express-validator");

const {
  addShop,
  getShops,
  updateShop,
  deleteShop,
  getShopById,
} = require("../controllers/Shop.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { validation } = require("../validators/Validators");

const {
  phoneNumberValidation,
} = require("../validators/PhoneNumberValidators");

const {
  aadharNumberValidation,
} = require("../validators/AadharNumberValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const router = express.Router();

router.get("/shops", tokenValidation, rdAdminTokenValidation, getShops);
router.get(
  "/shop/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  getShopById
);

router.post(
  "/shop/create",
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("shop_name").isString().trim().notEmpty(),
    body("owner_name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("phone_number").isString(),
    body("aadhar_number").isString(),
    body("owner_image").isString().trim().notEmpty(),
    body("owner_aadhar_card").isString().trim().notEmpty(),
    body("shop_image").isString().trim().notEmpty(),
    body("address").isString().trim().notEmpty(),
    body("place").isString().trim().notEmpty(),
    body("shop_category").isString().trim().notEmpty(),
  ],
  phoneNumberValidation,
  aadharNumberValidation,
  validation,
  addShop
);

router.put(
  "/shop/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("shop_name").isString().trim().notEmpty().isString(),
    body("owner_name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("phone_number").isString(),
    body("aadhar_number").isString(),
    body("owner_image").isString().trim().notEmpty(),
    body("owner_aadhar_card").isString().trim().notEmpty(),
    body("shop_image").isString().trim().notEmpty(),
    body("address").isString().trim().notEmpty(),
    body("place").isString().trim().notEmpty(),
    body("shop_category").isString().trim().notEmpty(),
  ],
  phoneNumberValidation,
  aadharNumberValidation,
  validation,
  updateShop
);

router.delete(
  "/shop/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteShop
);

module.exports = router;
