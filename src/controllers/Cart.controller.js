const CartModal = require("../models/Cart.modal");
const ProductModal = require("../models/Product.modal");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { PROD_API } = require("../constants/Product.messages");
const { CART_API, COMMON } = require("../constants/Cart.message");

module.exports.createCart = async (req, resp, next) => {
  const { product_id, unit_id } = req.body;
  const user_id = req.id;

  const cart = await CartModal.findOne({
    user: user_id,
  });
  if (!cart) {
    const product = await ProductModal.findOne({
      id: product_id,
    }).populate("profile", "name main_image");

    const unitIndex = product.units.findIndex(
      (unit) => unit.id.toString() === unit_id.toString()
    );

    if (!product || unitIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, PROD_API.PROD_NOT_FOUND.message));
    }

    const unit = product.units[unitIndex];

    let total_price = unit.sales_price;
    if (unit.total_price) {
      total_price = unit.total_price;
    }

    const productDetails = await product.populate("profile.main_image", "url");

    const cartModal = new CartModal({
      user: user_id,
      items: {
        product: {
          id: product_id,
          name: productDetails.profile.name,
          image: productDetails.profile.main_image.url,
        },
        price: unit.total_price ? unit.total_price : unit.sales_price,
        unitId: unit_id,
        quantity: 1,
      },
      totalPrice: total_price,
    });

    await cartModal.save();

    const cartResponse = {
      ...cartModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, CART_API.CART_CREATE.message, cartResponse)
      );
  } else {
    next();
  }
};

module.exports.addProductCart = async (req, resp) => {
  const { product_id, unit_id } = req.body;
  const user_id = req.id;

  const cart = await CartModal.findOne({
    user: user_id,
  });
  if (cart) {
    const product = await ProductModal.findOne({
      id: product_id,
    }).populate("profile", "name main_image");

    const unitIndex = product.units.findIndex(
      (unit) => unit.id.toString() === unit_id.toString()
    );

    if (!product || unitIndex === -1) {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, PROD_API.PROD_NOT_FOUND.message));
    }

    const unit = product.units[unitIndex];
    let total_price = cart.totalPrice;

    if (unit.total_price) {
      total_price += unit.total_price ? unit.total_price : unit.sales_price;
    }

    const cartItemIndex = cart.items.findIndex(
      (item) =>
        item.unitId.toString() === unit_id.toString() &&
        item.product.id.toString() === product_id.toString()
    );

    const productDetails = await product.populate("profile.main_image", "url");

    if (cartItemIndex === -1) {
      cart.items.push({
        product: {
          id: product_id,
          name: productDetails.profile.name,
          image: productDetails.profile.main_image.url,
        },
        price: unit.total_price ? unit.total_price : unit.sales_price,
        unitId: unit_id,
        quantity: 1,
      });
    } else {
      const cartItem = cart.items[cartItemIndex];
      cartItem.quantity += 1;
    }

    cart.totalPrice = total_price;

    await cart.save();

    const cartResponse = {
      ...cart.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, CART_API.CART_UPDATE.message, cartResponse)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getCartItems = async (req, resp) => {
  const user_id = req.id;

  const cart = await CartModal.findOne({
    user: user_id,
  }).populate("user");

  if (cart) {
    const populatedOrder = await CartModal.populate(
      cart,
      {
        path: "items.productId.profile",
        select: "name main_image",
      },
      {
        path: "items.productId.profile.main_image",
        select: "url",
      }
    );
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          CART_API.CART_SUCCESS.message,
          populatedOrder
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.SERVER_ERROR.message));
  }
};

module.exports.removeCartItem = async (req, resp) => {
  const { product_id, unit_id } = req.body;
  const user_id = req.id;

  const cart = await CartModal.findOne({
    user: user_id,
  });
  if (cart) {
    const cartItemIndex = cart.items.findIndex(
      (item) =>
        item.unitId.toString() === unit_id.toString() &&
        item.product.id.toString() === product_id.toString()
    );
    const cartItem = cart.items[cartItemIndex];
    if (cartItem.quantity === 1) {
      cart.items.splice(cartItemIndex, 1);
    } else {
      cartItem.quantity = cartItem.quantity - 1;
    }
    cart.totalPrice = cart.totalPrice - cartItem.price;

    await cart.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, CART_API.CART_DELETE.message, cart));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.SERVER_ERROR.message));
  }
};
