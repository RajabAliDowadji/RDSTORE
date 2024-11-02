const express = require("express");
const { body } = require("express-validator");

const {
  createPlace,
  getPlaces,
  updatePlace,
  deletePlace,
} = require("../controllers/Place.controller");

const { pinCodeValidation } = require("../validators/PincodeValidators");

const router = express.Router();

router.post(
  "/create/place",
  [body("zipCode").trim().isLength({ min: 6, max: 6 })],
  pinCodeValidation,
  createPlace
);

router.put(
  "/update/place/:id",
  [body("zipCode").trim().isLength({ min: 6, max: 6 })],
  pinCodeValidation,
  updatePlace
);

router.delete("/delete/place/:id", deletePlace);

router.get("/get/places", getPlaces);

module.exports = router;
