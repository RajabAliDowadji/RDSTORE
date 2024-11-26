const express = require("express");
const { body } = require("express-validator");

const {
  addProductProfile,
  getProductProfiles,
  updateProductProfile,
  deleteProductProfile,
} = require("../controllers/ProductProfile.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/product_profile",
  [
    body("name").isString().trim().notEmpty(),
    body("description").isString().trim().notEmpty(),
    body("weight").trim().notEmpty(),
    body("unit").isString().trim().notEmpty(),
    body("status").isString().trim().notEmpty(),
    body("main_image").isString().trim().notEmpty(),
    body("images").isArray({ min: 1, max: 4 }),
  ],
  validation,
  addProductProfile
);

router.put(
  "/update/product_profile/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("description").isString().trim().notEmpty(),
    body("weight").trim().notEmpty(),
    body("unit").isString().trim().notEmpty(),
    body("status").isString().trim().notEmpty(),
    body("main_image").isString().trim().notEmpty(),
    body("images").isArray({ min: 1, max: 4 }),
  ],
  validation,
  updateProductProfile
);

router.delete("/delete/product_profile/:id", deleteProductProfile);

router.get("/get/product_profiles", getProductProfiles);

module.exports = router;
