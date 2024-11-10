const express = require("express");
const { body } = require("express-validator");

const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
} = require("../controllers/ProductBrand.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/brand",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
  ],
  validation,
  createBrand
);

router.put(
  "/update/brand/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("image").isString().trim().notEmpty(),
  ],
  validation,
  updateBrand
);

router.delete("/delete/brand/:id", deleteBrand);

router.get("/get/brands", getBrands);

module.exports = router;
