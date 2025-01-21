const express = require("express");
const { body } = require("express-validator");

const {
  createCommission,
  updateCommission,
  deleteCommission,
  getCommissions,
} = require("../controllers/Commission.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/commission",
  [
    body("comm_type").isString().trim().notEmpty(),
    body("target_id").isString().trim().notEmpty(),
    body("comm_target").isString().trim().notEmpty(),
    body("comm_amount").trim().notEmpty(),
  ],
  validation,
  createCommission
);

router.put(
  "/update/commission/:id",
  [
    body("comm_type").isString().trim().notEmpty(),
    body("target_id").isString().trim().notEmpty(),
    body("comm_target").isString().trim().notEmpty(),
    body("comm_amount").trim().notEmpty(),
  ],
  validation,
  updateCommission
);

router.delete("/delete/commission/:id", deleteCommission);

router.get("/get/commissions", getCommissions);

module.exports = router;
