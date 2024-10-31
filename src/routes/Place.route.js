const express = require("express");
const { body } = require("express-validator");

const {
  addPlace,
  getPlace,
  getPlaceById,
  getPlaces,
  updatePlace,
  deletePlace,
} = require("../controllers/Place.controller");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { idValidation } = require("../middlewares/IdValidation");

const { pinCodeValidation } = require("../validators/PincodeValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const router = express.Router();

router.get("/places", tokenValidation, getPlaces);

router.get(
  "/rd_admin/place/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  getPlaceById
);

router.post(
  "/rd_admin/place",
  [body("pincode").trim().isLength({ min: 6, max: 6 })],
  tokenValidation,
  rdAdminTokenValidation,
  pinCodeValidation,
  getPlace
);

router.post(
  "/rd_admin/place/create",
  [body("pincode").trim().isLength({ min: 6, max: 6 })],
  pinCodeValidation,
  tokenValidation,
  rdAdminTokenValidation,
  addPlace
);

router.put(
  "/rd_admin/place/:id",
  idValidation,
  [body("pincode").trim().isLength({ min: 6, max: 6 })],
  pinCodeValidation,
  tokenValidation,
  rdAdminTokenValidation,
  updatePlace
);

router.delete(
  "/rd_admin/place/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deletePlace
);

module.exports = router;
