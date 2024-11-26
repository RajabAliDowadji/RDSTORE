// Package Import Start
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
// Package Import End

// Routes Import Start
const PlaceRoutes = require("./src/routes/Place.route");
const ShopRoutes = require("./src/routes/Shop.route");
const ProductCategoriesRoutes = require("./src/routes/ProductCategories.route");
const ProductSubCategoriesRoutes = require("./src/routes/ProductSubCategories.route");
const ProductBrandRoutes = require("./src/routes/ProductBrand.route");
const ProductProfilesRoutes = require("./src/routes/ProductProfile.route");
const ProductRoutes = require("./src/routes/Product.route");
const ProductRatingRoutes = require("./src/routes/ProductRating.route");
const CommissionTypeRoutes = require("./src/routes/CommissionType.route");
const CommissionRoutes = require("./src/routes/Commission.route");
const AdminCommissionRoutes = require("./src/routes/AdminCommission.route");
const ImageUploadRoutes = require("./src/routes/S3Bucket.route");
const UserRoutes = require("./src/routes/User.route");
const CartRoutes = require("./src/routes/Cart.route");
const OrderRoutes = require("./src/routes/Order.route");
const PaymentRoutes = require("./src/routes/Payment.route");

const MerchantBadges = require("./src/routes/MerchantBadge.route");
const ShopProfile = require("./src/routes/ShopProfile.route");
// Routes Import End

// Constant Import Start
require("./src/services/connection");
const { ROUTES } = require("./src/constants/Constants");
const {
  superAdminAuthValidation,
} = require("./src/validators/SuperAdminTokenValidation");
// Constant Import End

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // RD ADMIN Routes Start
// app.use(PlaceRoutes);
// app.use(ROUTES.SUPER_ADMIN, CommissionTypeRoutes);
// app.use(ROUTES.SUPER_ADMIN, ShopRoutes);
// app.use(ROUTES.SUPER_ADMIN, CommissionRoutes);
// app.use(ROUTES.SUPER_ADMIN, AdminCommissionRoutes);
// app.use(ROUTES.PRODUCT, ProductCategoriesRoutes);
// app.use(ROUTES.PRODUCT, ProductSubCategoriesRoutes);
// app.use(ROUTES.PRODUCT, ProductBrandRoutes);

// // RD ADMIN Routes End

// // RD ADMIN AND SHOP ADMIN START
// app.use(ProductRoutes);
// // RD ADMIN AND SHOP ADMIN END

// // ALL ACCESS ROUTES START

// app.use(CartRoutes);
// app.use(OrderRoutes);
// app.use(PaymentRoutes);
// app.use(ImageUploadRoutes);
// app.use(ProductRatingRoutes);
// // ALL ACCESS ROUTES END

app.use(ROUTES.ROOT, UserRoutes);
app.use(ROUTES.ROOT, ImageUploadRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, ShopRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, PlaceRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, ShopProfile);
app.use(ROUTES.ROOT, superAdminAuthValidation, MerchantBadges);
app.use(ROUTES.ROOT, superAdminAuthValidation, ProductBrandRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, ProductProfilesRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, ProductCategoriesRoutes);
app.use(ROUTES.ROOT, superAdminAuthValidation, ProductSubCategoriesRoutes);

app.listen(5000);
