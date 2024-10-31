const CartModal = require("../models/Cart.modal");
const { CART_API, COMMON } = require("../constants/Cart.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.getCartItems = async (req, resp, next) => {
  const { user_id } = req;
  const cartItem = await CartModal.findOne({ user: user_id }).populate({
    path: "cart_items.product",
    populate: [
      {
        path: "product_brand",
      },
      {
        path: "product_sub_category",
      },
      {
        path: "product_images",
      },
    ],
  });
  if (cartItem) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, CART_API.CART_SUCCESS.message, cartItem)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
module.exports.addCartItem = async (req, resp, next) => {
  const { user_id } = req;
  const { product } = req.body;
  let cart = [];
  const cartItem = await CartModal.findOne({ user: user_id });
  if (cartItem) {
    if (cartItem.cart_items.length != 0) {
      cart = [...cartItem.cart_items];
      const itemIndex = cartItem.cart_items.findIndex(
        (item) => item.product.toString() === product.toString()
      );
      if (itemIndex !== -1) {
        cart[itemIndex].product_qty += 1;
      } else {
        cart.push({
          product: product,
          product_qty: 1,
        });
      }
    } else {
      cart.push({
        product: product,
        product_qty: 1,
      });
    }
    cartItem.user = user_id;
    cartItem.cart_items = cart;

    await cartItem.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, CART_API.CART_CREATE.message, cartItem)
      );
  }
};

module.exports.removeCartItem = async (req, resp, next) => {
  const { user_id } = req;
  const { product } = req.body;
  let cart = [];
  const cartItem = await CartModal.findOne({ user: user_id });
  if (cartItem) {
    cart = [...cartItem.cart_items];
    const itemIndex = cartItem.cart_items.findIndex(
      (item) => item.product.toString() === product.toString()
    );
    if (itemIndex !== -1) {
      if (cart[itemIndex].product_qty === 1) {
        await CartModal.updateOne(
          { user: user_id },
          { $pull: { cart_items: { product: product } } }
        );
      } else {
        cart[itemIndex].product_qty -= 1;
      }
    }
    cartItem.user = user_id;
    cartItem.cart_items = cart;

    await cartItem.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, CART_API.CART_UPDATE.message, cartItem)
      );
  }
};

module.exports.addBulkCartItems = async (req, resp, next) => {
  const { user_id } = req;
  const { cart_items } = req.body;
  const cartItem = await CartModal.findOne({ user: user_id });
  if (cartItem) {
    cartItem.user = user_id;
    cartItem.cart_items = cart_items;

    await cartItem.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, CART_API.CART_CREATE.message));
  }
};

module.exports.deleteCartItems = async (req, resp, next) => {
  const productId = req.params.id;
  const { user_id } = req;
  await CartModal.updateOne(
    { user: user_id },
    { $pull: { cart_items: { product: productId } } }
  );
  return resp
    .status(STATUS.SUCCESS)
    .send(apiResponse(STATUS.SUCCESS, CART_API.CART_DELETE.message));
};
