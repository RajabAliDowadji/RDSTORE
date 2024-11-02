const express = require("express");
const { body } = require("express-validator");

const {
  createShopProfile,
  updateShopProfile,
  getShopProfiles,
  deleteShopProfile,
} = require("../controllers/ShopProfile.controller");

const { validation } = require("../validators/Validators");

const {
  phoneNumberValidation,
} = require("../validators/PhoneNumberValidators");

const {
  aadharNumberValidation,
} = require("../validators/AadharNumberValidators");

const router = express.Router();

router.post(
  "/create/shop_profile",
  [
    body("shop_name").isString().trim().notEmpty(),
    body("owner_name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("phone_code").isString(),
    body("phone_number").isString(),
    body("aadhar_number").isString(),
    body("address").isString().trim().notEmpty(),
    body("zipCode").isString().trim().notEmpty(),
    body("owner_image").isString().trim().notEmpty(),
    body("aadhar_card_img").isString().trim().notEmpty(),
    body("shop_image").isString().trim().notEmpty(),
  ],
  phoneNumberValidation,
  aadharNumberValidation,
  validation,
  createShopProfile
);

router.put(
  "/update/shop_profile/:id",
  [
    body("shop_name").isString().trim().notEmpty(),
    body("owner_name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("phone_code").isString(),
    body("phone_number").isString(),
    body("aadhar_number").isString(),
    body("address").isString().trim().notEmpty(),
    body("zipCode").isString().trim().notEmpty(),
    body("owner_image").isString().trim().notEmpty(),
    body("aadhar_card_img").isString().trim().notEmpty(),
    body("shop_image").isString().trim().notEmpty(),
  ],
  phoneNumberValidation,
  aadharNumberValidation,
  validation,
  updateShopProfile
);

router.get("/get/shops", getShopProfiles);

router.delete("/delete/shop/:id", deleteShopProfile);

module.exports = router;
