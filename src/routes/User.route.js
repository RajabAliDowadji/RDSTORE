const express = require("express");
const { body } = require("express-validator");

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
} = require("../controllers/User.controller");

const {
  phoneNumberValidation,
} = require("../validators/PhoneNumberValidators");

const { validation } = require("../validators/Validators");
const { tokenValidation } = require("../validators/tokenValidators");

const router = express.Router();

router.post(
  "/create/user",
  [
    body("password").isString().trim().notEmpty().isLength({ min: 8, max: 16 }),
    body("name").isString().trim().notEmpty(),
  ],
  phoneNumberValidation,
  validation,
  createUser
);

router.put(
  "/update/user/:id",
  [body("name").isString().trim().notEmpty()],
  tokenValidation,
  phoneNumberValidation,
  validation,
  updateUser
);

router.delete("/delete/user/:id", tokenValidation, deleteUser);

router.get("/get/user/:id", tokenValidation, getUser);

router.post(
  "/user/login",
  [body("password").isString().trim().notEmpty().isLength({ min: 8, max: 16 })],
  phoneNumberValidation,
  validation,
  loginUser
);

module.exports = router;
