const express = require("express");
const { body } = require("express-validator");

const {
  createSuperAdmin,
  addShopToAdmin,
  getSuperAdmins,
  deleteAdmin,
  getAdminShops,
  deleteAdminShop,
} = require("../controllers/SuperAdmin.controller");

const { validation } = require("../validators/Validators");

const router = express.Router();

router.post(
  "/create/admin",
  [body("user_id").isString().trim().notEmpty()],
  validation,
  createSuperAdmin
);

router.get("/get/admins", getSuperAdmins);

router.post(
  "/add/shop",
  [
    body("user_id").isString().trim().notEmpty(),
    body("shop_id").isString().trim().notEmpty(),
  ],
  validation,
  addShopToAdmin
);

router.get("/get/shops/:id", getAdminShops);

router.delete("/delete/admin/:id", deleteAdmin);

router.delete(
  "/delete/shop/",
  [
    body("user_id").isString().trim().notEmpty(),
    body("shop_id").isString().trim().notEmpty(),
  ],
  validation,
  deleteAdminShop
);

module.exports = router;
