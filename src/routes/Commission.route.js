const express = require("express");
const { body } = require("express-validator");

const {
  getCommissions,
  addCommission,
  updateCommission,
  deleteCommission,
  getCommissionById,
} = require("../controllers/Commission.controller");

const {
  idValidation,
  productValidation,
  commissionTypeValidation,
} = require("../middlewares/IdValidation");

const { validation } = require("../validators/Validators");

const { tokenValidation } = require("../validators/tokenValidators");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const router = express.Router();

router.get(
  "/commissions",
  tokenValidation,
  rdAdminTokenValidation,
  getCommissions
);

router.get(
  "/commission/:id",
  tokenValidation,
  rdAdminTokenValidation,
  getCommissionById
);

router.post(
  "/commission/create",
  tokenValidation,
  rdAdminTokenValidation,
  [body("commission").isNumeric().isLength({ min: 1 })],
  validation,
  productValidation,
  commissionTypeValidation,
  addCommission
);

router.put(
  "/commission/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [body("commission").isNumeric().isLength({ min: 1 })],
  validation,
  productValidation,
  commissionTypeValidation,
  updateCommission
);

router.delete(
  "/commission/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteCommission
);

module.exports = router;
