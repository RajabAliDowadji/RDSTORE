const MerchantBadgeModal = require("../models/MerchantBadge.modal");
const { SHOP_BAD_API, COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createBadge = async (req, resp) => {
  const { name, sales_min, sales_max, image } = req.body;
  const badge = await MerchantBadgeModal.findOne({ name });
  if (!badge) {
    const badge = new MerchantBadgeModal({
      name: name,
      sales_min: sales_min,
      sales_max: sales_max,
      image: image,
    });
    await badge.save();
    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, SHOP_BAD_API.SHOP_BAD_CREATE.message, badge)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          SHOP_BAD_API.SHOP_BAD_ALREADY_REGISTER.message
        )
      );
  }
};

// module.exports.getShopBadges = async (req, resp, next) => {
//   const shopBadges = await MerchantBadgeModal.find({
//     is_active: true,
//     is_deleted: false,
//   }).populate("badge_img");
//   if (shopBadges) {
//     return resp
//       .status(STATUS.SUCCESS)
//       .send(
//         apiResponse(
//           STATUS.SUCCESS,
//           SHOP_BAD_API.SHOP_BAD_SUCCESS.message,
//           shopBadges
//         )
//       );
//   } else {
//     return resp
//       .status(STATUS.INTERNAL_SERVER)
//       .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
//   }
// };

// module.exports.getShopBadgeById = async (req, resp, next) => {
//   const id = req.params.id;
//   const shopBadge = await MerchantBadgeModal.findOne({
//     id: id,
//     is_active: true,
//     is_deleted: false,
//   }).populate("badge_img");
//   if (shopBadge) {
//     return resp
//       .status(STATUS.SUCCESS)
//       .send(
//         apiResponse(
//           STATUS.SUCCESS,
//           SHOP_BAD_API.SHOP_BAD_SUCCESS.message,
//           shopBadge
//         )
//       );
//   } else {
//     return resp
//       .status(STATUS.INTERNAL_SERVER)
//       .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
//   }
// };

// module.exports.updateShopBadge = async (req, resp, next) => {
//   const shopBadgeId = req.params.id;
//   const { badge_name, min_range, max_range, badge_img } = req.body;
//   const shopBadge = await MerchantBadgeModal.findOne({
//     id: shopBadgeId,
//     is_active: true,
//     is_deleted: false,
//   });
//   if (shopBadge) {
//     shopBadge.badge_name = badge_name;
//     shopBadge.min_range = min_range;
//     shopBadge.max_range = max_range;
//     shopBadge.badge_img = badge_img;
//     await shopBadge.save();
//     return resp
//       .status(STATUS.SUCCESS)
//       .send(
//         apiResponse(
//           STATUS.SUCCESS,
//           SHOP_BAD_API.SHOP_BAD_UPDATE.message,
//           shopBadge
//         )
//       );
//   } else {
//     return resp
//       .status(STATUS.BAD)
//       .send(errorResponse(STATUS.BAD, SHOP_BAD_API.SHOP_BAD_INVALID.message));
//   }
// };

// module.exports.deleteShopBadge = async (req, resp, next) => {
//   const shopBadgeId = req.params.id;
//   const shopBadge = await MerchantBadgeModal.findOne({
//     id: shopBadgeId,
//     is_deleted: false,
//   });
//   if (shopBadge) {
//     shopBadge.is_active = false;
//     shopBadge.is_deleted = true;
//     await shopBadge.save();
//     return resp
//       .status(STATUS.SUCCESS)
//       .send(apiResponse(STATUS.SUCCESS, SHOP_BAD_API.SHOP_BAD_DELETE.message));
//   } else {
//     return resp
//       .status(STATUS.BAD)
//       .send(errorResponse(STATUS.BAD, SHOP_BAD_API.SHOP_BAD_NOT_FOUND.message));
//   }
// };
