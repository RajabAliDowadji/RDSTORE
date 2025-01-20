const express = require("express");
const { body } = require("express-validator");

const {
  addAddress,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/Address.controller");
const { validation } = require("../validators/Validators");
const { tokenValidation } = require("../validators/tokenValidators");

const router = express.Router();

router.post(
  "/create/user/address",
  tokenValidation,
  [
    body("streetAddress").isString().trim().notEmpty(),
    body("place").trim().isLength({ min: 6, max: 6 }),
  ],
  validation,
  createAddress
);

router.get("/get/address", tokenValidation, getAddresses);

router.post(
  "/add/user/address",
  tokenValidation,
  [
    body("streetAddress").isString().trim().notEmpty(),
    body("place").trim().isLength({ min: 6, max: 6 }),
  ],
  validation,
  addAddress
);

// router.put(
//   "/update/user/address",
//   tokenValidation,
//   [
//     body("streetAddress").isString().trim().notEmpty(),
//     body("place").trim().isLength({ min: 6, max: 6 }),
//     body("address_id").isString().trim().notEmpty(),
//   ],
//   validation,
//   updateAddress
// );

// router.delete(
//   "/delete/user/address",
//   tokenValidation,
//   [body("address_id").isString().trim().notEmpty()],
//   validation,
//   deleteAddress
// );

module.exports = router;
