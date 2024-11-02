const ShopProfileModal = require("../models/ShopProfile.modal");
const { SHOP_API, COMMON } = require("../constants/Shop.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createShopProfile = async (req, resp) => {
  const {
    shop_name,
    owner_name,
    email,
    phone_code,
    phone_number,
    aadhar_number,
    address,
    zipCode,
    owner_image,
    aadhar_card_img,
    shop_image,
  } = req.body;

  const shopProfile = await ShopProfileModal.findOne({
    email: email,
    aadhar_number: aadhar_number,
    phone_number: phone_number,
  });
  if (!shopProfile) {
    const shopDetails = {
      shop_name: shop_name,
      owner_name: owner_name,
      contact: {
        email: email,
        phone_number: phone_number,
        phone_code: phone_code,
        aadhar_number: aadhar_number,
      },
      location: {
        address: address,
        zipCode: zipCode,
      },
      images: {
        shop: shop_image,
        owner: owner_image,
        aadhar_card: aadhar_card_img,
      },
    };
    const shopProfileModal = new ShopProfileModal(shopDetails);

    await shopProfileModal.save();

    const shopProfileModalResponse = {
      ...shopProfileModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SHOP_API.SHOP_CREATE.message,
          shopProfileModalResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_ALREADY_REGISTER.message));
  }
};

module.exports.updateShopProfile = async (req, resp) => {
  const shopId = req.params.id;
  const {
    shop_name,
    owner_name,
    email,
    phone_code,
    phone_number,
    aadhar_number,
    address,
    zipCode,
    owner_image,
    aadhar_card_img,
    shop_image,
  } = req.body;

  const shopProfile = await ShopProfileModal.findOne({ _id: shopId });
  if (shopProfile) {
    shopProfile.shop_name = shop_name;
    shopProfile.owner_name = owner_name;
    shopProfile.location = {
      address: address,
      zipCode: zipCode,
    };
    shopProfile.contact = {
      email: email,
      phone_number: phone_number,
      phone_code: phone_code,
      aadhar_number: aadhar_number,
    };
    shopProfile.images = {
      shop: shop_image,
      owner: owner_image,
      aadhar_card: aadhar_card_img,
    };

    await shopProfile.save();

    const shopProfileModalResponse = {
      ...shopProfile.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SHOP_API.SHOP_UPDATE.message,
          shopProfileModalResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_INVALID_ID.message));
  }
};

module.exports.deleteShopProfile = async (req, resp) => {
  const shopId = req.params.id;
  const shopProfile = await ShopProfileModal.findOne({ id: shopId });
  if (shopProfile) {
    shopProfile.activity = {
      ...shopProfile.activity,
      is_deleted: true,
      is_active: false,
    };
    await shopProfile.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, SHOP_API.SHOP_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, SHOP_API.SHOP_NOT_FOUND.message));
  }
};

module.exports.getShopProfiles = async (req, resp) => {
  const shops = await ShopProfileModal.find();

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
