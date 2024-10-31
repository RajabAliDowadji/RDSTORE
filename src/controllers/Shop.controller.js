const ShopModal = require("../models/Shop.modal");
const AdminCommissionModal = require("../models/AdminCommission.modal");
const { SHOP_API, COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { multipleDeleteFile } = require("../helpers/multipleDeleteFile");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getShops = async (req, resp, next) => {
  const shops = await ShopModal.find()
    .populate("place")
    .populate("shop_category")
    .populate("owner_image")
    .populate("owner_aadhar_card")
    .populate("shop_image");
  if (shops) {
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_SUCCESS.message, shops));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.getShopById = async (req, resp, next) => {
  const shopId = req.params.id;
  const shop = await ShopModal.findOne({ _id: shopId })
    .populate("place")
    .populate("shop_category")
    .populate("owner_image")
    .populate("owner_aadhar_card")
    .populate("shop_image");
  if (shop) {
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_SUCCESS.message, shop));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.addShop = async (req, resp, next) => {
  const {
    shop_name,
    owner_name,
    email,
    phone_number,
    optional_number,
    aadhar_number,
    second_owner_name,
    second_owner_number,
    owner_image,
    owner_aadhar_card,
    shop_image,
    address,
    place,
    shop_category,
  } = req.body;

  const shop = await ShopModal.findOne({
    email: email,
    aadhar_number: aadhar_number,
    phone_number: phone_number,
  });
  if (!shop) {
    const shopmodal = new ShopModal({
      shop_name: shop_name,
      owner_name: owner_name,
      email: email,
      phone_number: phone_number,
      optional_number: optional_number,
      aadhar_number: aadhar_number,
      second_owner_name: second_owner_name,
      second_owner_number: second_owner_number,
      owner_image: owner_image,
      owner_aadhar_card: owner_aadhar_card,
      shop_image: shop_image,
      address: address,
      place: place,
      shop_category: shop_category,
    });
    await shopmodal.save();

    const adminCommission = new AdminCommissionModal({
      shop_id: shopmodal._id,
    });
    await adminCommission.save();
    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, SHOP_API.SHOP_CREATE.message, shopmodal)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_ALREADY_REGISTER.message));
  }
};

module.exports.updateShop = async (req, resp, next) => {
  const shopId = req.params.id;
  const {
    shop_name,
    owner_name,
    email,
    phone_number,
    optional_number,
    aadhar_number,
    second_owner_name,
    second_owner_number,
    owner_image,
    owner_aadhar_card,
    shop_image,
    address,
    place,
    shop_category,
  } = req.body;
  const shop = await ShopModal.findOne({ _id: shopId });
  if (shop) {
    shop.shop_name = shop_name;
    shop.owner_name = owner_name;
    shop.email = email;
    shop.phone_number = phone_number;
    shop.optional_number = optional_number;
    shop.aadhar_number = aadhar_number;
    shop.second_owner_name = second_owner_name;
    shop.second_owner_number = second_owner_number;
    shop.owner_image = owner_image;
    shop.owner_aadhar_card = owner_aadhar_card;
    shop.shop_image = shop_image;
    shop.address = address;
    shop.place = place;
    shop.shop_category = shop_category;

    await shop.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_UPDATE.message, shop));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_INVALID_ID.message));
  }
};

module.exports.deleteShop = async (req, resp, next) => {
  const shopId = req.params.id;
  const response = await ShopModal.findOne({ _id: shopId })
    .populate("owner_image")
    .populate("owner_aadhar_card")
    .populate("shop_image");
  if (response) {
    const deleteFile = [
      response.owner_image,
      response.shop_image,
      response.owner_aadhar_card,
    ];
    await multipleDeleteFile(deleteFile);
    await ShopModal.findByIdAndRemove({ _id: shopId });
    await AdminCommissionModal.findOneAndDelete({ shop_id: shopId });
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_NOT_FOUND.message));
  }
};
