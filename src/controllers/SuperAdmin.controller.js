const SuperAdminModal = require("../models/SuperAdmin.modal");
const ShopModal = require("../models/Shop.modal");
const { SUPER_ADMIN_API, COMMON } = require("../constants/Admin.messages");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createSuperAdmin = async (req, resp) => {
  const { user_id } = req.body;

  const superAdmin = await SuperAdminModal.findOne({
    user: user_id,
  });
  if (!superAdmin) {
    const superAdmin = new SuperAdminModal({
      user: user_id,
    });

    await superAdmin.save();

    const superAdminResponse = {
      ...superAdmin.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SUPER_ADMIN_API.SUPER_ADMIN_CREATE.message,
          superAdminResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          SUPER_ADMIN_API.SUPER_ADMIN_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.getSuperAdmins = async (req, resp) => {
  const superAdmins = await SuperAdminModal.find();

  if (superAdmins) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SUPER_ADMIN_API.SUPER_ADMIN_SUCCESS.message,
          superAdmins
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addShopToAdmin = async (req, resp) => {
  const { user_id, shop_id } = req.body;

  const superAdmin = await SuperAdminModal.findOne({
    user: user_id,
  });
  if (superAdmin) {
    const shopExists = superAdmin.shops.some(
      (shop) => shop.shopId.toString() === shop_id.toString()
    );
    const shop = await ShopModal.findOne({
      shop_id: shop_id,
    }).populate("shop_id");

    if (shopExists || !shop) {
      return resp
        .status(STATUS.BAD)
        .send(
          apiResponse(
            STATUS.BAD,
            SUPER_ADMIN_API.SUPER_ADMIN_INVALID_SHOP.message
          )
        );
    }

    superAdmin.shops.push({
      shop: shop_id,
      shopName: shop?.shop_id?.shop_name,
      numOrders: shop?.numOrders,
      totalSales: shop?.totalSales,
      totalDeductions: shop?.totalDeductions,
      commissionAmount: shop?.commissionAmount,
    });

    superAdmin.numOrders += shop.numOrders || 0;
    superAdmin.totalSales += shop.totalSales || 0;
    superAdmin.totalDeductions += shop.totalDeductions || 0;
    superAdmin.commissionAmount += shop.commissionAmount || 0;

    await superAdmin.save();

    const superAdminResponse = {
      ...superAdmin.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          SUPER_ADMIN_API.SUPER_ADMIN_CREATE.message,
          superAdminResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, SUPER_ADMIN_API.SUPER_ADMIN_NOT_FOUND.message)
      );
  }
};

module.exports.getAdminShops = async (req, resp) => {
  const adminId = req.params.id;
  const adminShops = await SuperAdminModal.findOne({ user: adminId });
  if (adminShops) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SUPER_ADMIN_API.SUPER_ADMIN_SUCCESS.message,
          adminShops
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.deleteAdmin = async (req, resp) => {
  const adminId = req.params.id;
  const superAdmin = await SuperAdminModal.findOne({ user: adminId });
  if (superAdmin) {
    superAdmin.activity = {
      ...superAdmin.activity,
      is_deleted: true,
      is_active: false,
    };
    await superAdmin.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, SUPER_ADMIN_API.SUPER_ADMIN_DELETE.message)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, SUPER_ADMIN_API.SUPER_ADMIN_NOT_FOUND.message)
      );
  }
};

module.exports.deleteAdminShop = async (req, resp) => {
  const { user_id, shop_id } = req.body;
  const superAdmin = await SuperAdminModal.findOne({
    user: user_id,
  });
  if (superAdmin) {
    const shopIndex = superAdmin.shops.findIndex(
      (shop) => shop.shop.toString() === shop_id.toString()
    );

    if (shopIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(
          apiResponse(
            STATUS.BAD,
            SUPER_ADMIN_API.SUPER_ADMIN_SHOP_NOT_FOUND.message
          )
        );
    }

    const shop = superAdmin.shops[shopIndex];

    superAdmin.shops.splice(shopIndex, 1);

    superAdmin.numOrders -= shop.numOrders || 0;
    superAdmin.totalSales -= shop.totalSales || 0;
    superAdmin.totalDeductions -= shop.totalDeductions || 0;
    superAdmin.commissionAmount -= shop.commissionAmount || 0;

    await superAdmin.save();

    const superAdminResponse = {
      ...superAdmin.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          SUPER_ADMIN_API.SUPER_ADMIN_SHOP_DELETE.message,
          superAdminResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(STATUS.BAD, SUPER_ADMIN_API.SUPER_ADMIN_NOT_FOUND.message)
      );
  }
};
