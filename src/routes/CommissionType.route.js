const express = require("express");
const { body } = require("express-validator");

const {
  getCommissionTypes,
  createCommissionType,
  updateCommissionType,
  deleteCommissionType,
} = require("../controllers/CommissionType.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/commission_type",
  [
    body("name").isString().trim().notEmpty(),
    body("sign").isString().trim().notEmpty(),
  ],
  validation,
  createCommissionType
);

router.put(
  "/update/commission_type/:id",
  [
    body("name").isString().trim().notEmpty(),
    body("sign").isString().trim().notEmpty(),
  ],
  validation,
  updateCommissionType
);

router.get("/get/commission_types", getCommissionTypes);

router.delete("/delete/commission_type/:id", deleteCommissionType);

module.exports = router;
