const express = require("express");
const { body } = require("express-validator");

const {
  addShop,
  getShops,
  updateShop,
  deleteShop,
} = require("../controllers/Shop.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/shop",
  [
    body("shop_id").isString().trim().notEmpty(),
    body("badge_id").isString().trim().notEmpty(),
  ],
  validation,
  addShop
);

router.get("/get/shops", getShops);

router.put(
  "/update/shop/:id",
  [
    body("shop_id").isString().trim().notEmpty(),
    body("badge_id").isString().trim().notEmpty(),
  ],
  validation,
  updateShop
);

router.delete("/delete/shop/:id", deleteShop);

// router.get(
//   "/shop/:id",
//   idValidation,
//   tokenValidation,
//   rdAdminTokenValidation,
//   getShopById
// );

// router.put(
//   "/shop/:id",
//   idValidation,
//   tokenValidation,
//   rdAdminTokenValidation,
//   [
//     body("shop_name").isString().trim().notEmpty().isString(),
//     body("owner_name").isString().trim().notEmpty(),
//     body("email").isEmail().normalizeEmail(),
//     body("phone_number").isString(),
//     body("aadhar_number").isString(),
//     body("owner_image").isString().trim().notEmpty(),
//     body("owner_aadhar_card").isString().trim().notEmpty(),
//     body("shop_image").isString().trim().notEmpty(),
//     body("address").isString().trim().notEmpty(),
//     body("place").isString().trim().notEmpty(),
//     body("shop_category").isString().trim().notEmpty(),
//   ],
//   phoneNumberValidation,
//   aadharNumberValidation,
//   validation,
//   updateShop
// );

module.exports = router;
