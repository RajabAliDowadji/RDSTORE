const express = require("express");
const { body } = require("express-validator");

const {
  getAdminCommissions,
  getAdminCommissionById,
} = require("../controllers/AdminCommission.controller");

const { validation } = require("../validators/Validators");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const router = express.Router();

router.get(
  "/admin_commissions",
  tokenValidation,
  rdAdminTokenValidation,
  getAdminCommissions
);

router.get(
  "/admin_commission/:id",
  tokenValidation,
  rdAdminTokenValidation,
  getAdminCommissionById
);

module.exports = router;
