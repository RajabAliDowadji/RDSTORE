const express = require("express");
const { body } = require("express-validator");

const {
  getCommissionTypes,
  addCommissionType,
  updateCommissionType,
  deleteCommissionType,
  getCommissionTypeById,
} = require("../controllers/CommissionType.controller");

const { idValidation } = require("../middlewares/IdValidation");

const { rdAdminTokenValidation } = require("../validators/userTypeValidators");

const { tokenValidation } = require("../validators/tokenValidators");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.get(
  "/commissiontypes",
  tokenValidation,
  rdAdminTokenValidation,
  getCommissionTypes
);

router.get(
  "/commissiontype/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  getCommissionTypeById
);

router.post(
  "/commissiontype/create",
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("commission_name").isString().trim().notEmpty(),
    body("commission_sign").isString().trim().notEmpty(),
  ],
  validation,
  addCommissionType
);

router.put(
  "/commissiontype/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  [
    body("commission_name").isString().trim().notEmpty(),
    body("commission_sign").isString().trim().notEmpty(),
  ],
  validation,
  updateCommissionType
);

router.delete(
  "/commissiontype/:id",
  idValidation,
  tokenValidation,
  rdAdminTokenValidation,
  deleteCommissionType
);

module.exports = router;
