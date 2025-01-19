const CartModal = require("../models/Cart.modal");
const OrderModal = require("../models/Order.modal");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { ORDER_API, COMMON } = require("../constants/Order.message");

module.exports.createOrder = async (req, resp) => {
  const user_id = req.id;
  const cart = await CartModal.findOne({
    user: user_id,
  });

  if (cart) {
    const orderModal = new OrderModal({
      user: user_id,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });

    await orderModal.save();
    await cart.clearCart();

    const orderResponse = {
      ...orderModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          ORDER_API.ORDER_PLACED.message,
          orderResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getOrders = async (req, resp) => {
  const user_id = req.id;
  const orders = await OrderModal.find({
    user: user_id,
  });
  if (orders) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_SUCCESS.message, orders)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.paymentSucessOrder = async (req, resp) => {
  const user_id = req.id;
  const { transition_id, paymentMethod, order_id } = req.body;
  const order = await OrderModal.findOne({
    user: user_id,
    id: order_id,
  });
  if (order) {
    order.transitionId = transition_id;
    order.paymentMethod = paymentMethod;
    order.paymentStatus = "completed";

    await order.save();
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_PAYMENT.message, order)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.addressSuccessOrder = async (req, resp) => {
  const user_id = req.id;
  const { address_id, order_id } = req.body;
  const order = await OrderModal.findOne({
    user: user_id,
    id: order_id,
  });
  if (order) {
    order.address = address_id;

    await order.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_SUCCESS.message, order)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.updateAddressOrder = async (req, resp) => {
  const user_id = req.id;
  const { order_id, order_status } = req.body;
  const order = await OrderModal.findOne({
    user: user_id,
    id: order_id,
  });
  if (order) {
    order.status = order_status;

    await order.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_PLACED.message, order));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
