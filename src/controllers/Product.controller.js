const ProductModal = require("../models/Product.modal");
const {
  PROD_API,
  COMMON,
  PROD_UNIT_API,
} = require("../constants/Product.messages");
const { STATUS, ACCOUNT_TYPE } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.addProduct = async (req, resp) => {
  const { profile, category, sub_category, brand } = req.body;
  const product = await ProductModal.findOne({
    profile,
  });
  if (!product) {
    const productModal = new ProductModal({
      profile,
      category,
      sub_category,
      brand,
      activity: {
        is_active: req.role === ACCOUNT_TYPE.SUPER_ADMIN,
      },
    });

    await productModal.save();

    const productResponse = {
      ...productModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_API.PROD_CREATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_ALREADY_REGISTER.message));
  }
};

module.exports.addProductUnit = async (req, resp) => {
  const { type, number, total_price, sales_price, product_id } = req.body;
  const product = await ProductModal.findOne({ id: product_id });
  if (product) {
    const unitExists = product.units.some(
      (unit) => unit.type === type && unit.number === number
    );
    if (unitExists) {
      return resp
        .status(STATUS.BAD)
        .send(
          apiResponse(
            STATUS.BAD,
            PROD_UNIT_API.PROD_UNIT_ALREADY_REGISTER.message
          )
        );
    }

    product.units.push({
      type: type,
      number: number,
      total_price: total_price,
      sales_price: sales_price,
    });

    await product.save();

    const productResponse = {
      ...product.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_UNIT_API.PROD_UNIT_CREATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};

module.exports.updateProduct = async (req, resp) => {
  const productId = req.params.id;
  const { profile, category, sub_category, brand } = req.body;
  const product = await ProductModal.findOne({ id: productId });
  if (product) {
    product.profile = profile;
    product.category = category;
    product.brand = brand;
    product.sub_category = sub_category;
    product.activity = {
      ...product.activity,
      is_active: req.role === ACCOUNT_TYPE.SUPER_ADMIN,
    };

    await product.save();

    const productResponse = {
      ...product.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          PROD_API.PROD_UPDATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};

module.exports.updateProductUnit = async (req, resp) => {
  const productUnitId = req.params.id;
  const { type, number, total_price, sales_price, product_id } = req.body;
  const product = await ProductModal.findOne({ id: product_id });
  if (product) {
    const unitIndex = product.units.findIndex(
      (unit) => unit.id.toString() === productUnitId.toString()
    );

    if (unitIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(
          apiResponse(STATUS.BAD, PROD_UNIT_API.PROD_UNIT_NOT_FOUND.message)
        );
    }

    const unit = product.units[unitIndex];

    unit.type = type || unit.type;
    unit.number = number || unit.number;
    unit.total_price = total_price || unit.total_price;
    unit.sales_price = sales_price || unit.sales_price;

    await product.save();

    const productResponse = {
      ...product.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          PROD_UNIT_API.PROD_UNIT_UPDATE.message,
          productResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};

module.exports.getProducts = async (req, resp) => {
  const products = await ProductModal.find()
    .populate("profile")
    .populate("category")
    .populate("brand")
    .populate("sub_category");

  if (products) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, PROD_API.PROD_SUCCESS.message, products)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.deleteProduct = async (req, resp) => {
  const productId = req.params.id;
  const product = await ProductModal.findOne({ id: productId });
  if (product) {
    product.activity = {
      ...product.activity,
      is_deleted: true,
      is_active: false,
    };

    await product.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, PROD_API.PROD_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};

module.exports.deleteProductUnit = async (req, resp) => {
  const productUnitId = req.params.id;
  const { product_id } = req.body;
  const product = await ProductModal.findOne({ id: product_id });
  if (product) {
    const unitIndex = product.units.findIndex(
      (unit) => unit.id.toString() === productUnitId.toString()
    );

    if (unitIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(
          apiResponse(STATUS.BAD, PROD_UNIT_API.PROD_UNIT_NOT_FOUND.message)
        );
    }

    product.units.splice(unitIndex, 1);

    await product.save();

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, PROD_UNIT_API.PROD_UNIT_DELETE.message)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, PROD_API.PROD_INVALID_ID.message));
  }
};
