const crypto = require("crypto");
const OrderModal = require("../models/Order.modal");
const CartModal = require("../models/Cart.modal");
const UserModal = require("../models/User.modal");
const ProductModal = require("../models/Product.modal");
const AdminCommissionModal = require("../models/AdminCommission.modal");
const { ORDER_API, COMMON } = require("../constants/Order.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");
const { instance } = require("../middlewares/paymentGateWay");

module.exports.placeOrder = async (req, resp, next) => {
  const { user_id } = req;
  let total_qty = 0;
  let total_price = 0;
  let commission_price = 0;
  let orderItem = [];
  const cartItem = await CartModal.findOne({ user: user_id });
  const user = await UserModal.findOne({ _id: user_id });
  const product_items = await ProductModal.find({
    _id: { $in: cartItem.cart_items.map((item) => item.product) },
  })
    .populate("product_brand")
    .populate("commission")
    .populate("product_images");
  if (cartItem) {
    cartItem.cart_items.map((item) => {
      return (total_qty = item.product_qty + total_qty);
    });
    cartItem.cart_items.map(
      (item) =>
        (total_price =
          total_price +
          item.product_qty *
            product_items.find(
              (product) => product._id.toString() === item.product.toString()
            ).product_price)
    );
    cartItem.cart_items.map((item) => {
      const product = product_items.find(
        (product) => product._id.toString() === item.product.toString()
      );
      orderItem.push({
        product: {
          product_id: product._id,
          product_qty: item.product_qty,
          product_title: product.product_title,
          product_brand: product.product_brand.brand_name,
          product_size: product.product_size,
          product_price: product.product_price,
          product_description: product.product_description,
          product_images: product.product_images,
        },
      });
      // commission_price +=
      //   item.product_qty * product.commission.commission_price;
    });
    const options = {
      amount: total_price * 100,
      currency: "INR",
    };
    const paymentDetails = await instance.orders.create(options);
    const orderBody = {
      total_qty: total_qty,
      total_price: total_price,
      commission_price: commission_price,
      user_id: user_id,
      user: {
        name: user.user_name,
        email: user.email,
        phone_number: user.phone_number,
      },
      order_item: orderItem,
      payment_details: {
        payment_id: paymentDetails.id,
        amount: paymentDetails.amount,
        amount_paid: paymentDetails.amount_paid,
        amount_due: paymentDetails.amount_due,
        currency: paymentDetails.currency,
        payment_status: paymentDetails.status,
      },
    };
    const order = new OrderModal(orderBody);
    await order.save();
    await CartModal.updateOne({ user: user_id }, { $set: { cart_items: [] } });

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, ORDER_API.ORDER_SUCCESS.message, order)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getPaymentKey = async (req, resp, next) => {
  const paymentaccessKeyId = process.env.RAZOR_ACCESS_KEY_ID;
  if (paymentaccessKeyId) {
    const access_key = { key: paymentaccessKeyId };
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_SUCCESS.message, access_key)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.getUserOrder = async (req, resp, next) => {
  const { user_id } = req;
  const paymentaccessKeyId = process.env.RAZOR_ACCESS_KEY_ID;
  const Order = await OrderModal.findOne({
    user_id: user_id,
    paid: false,
  });

  if (Order) {
    Order.access_key = paymentaccessKeyId;
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_SUCCESS.message, Order)
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.orderPaymentVerify = async (req, resp, next) => {
  const secretpaymentaccessKeyId = process.env.RAZOR_SECRET_KEY;

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", secretpaymentaccessKeyId)
    .update((razorpay_order_id + "|" + razorpay_payment_id).toString())
    .digest("hex");

  if (razorpay_signature === generated_signature) {
    await OrderModal.updateOne(
      { "payment_details.payment_id": razorpay_order_id },
      {
        transition_id: razorpay_payment_id,
        paid: razorpay_signature === generated_signature,
      }
    );
    return resp.redirect(process.env.FE_BASE_URL);
  } else {
    return resp.redirect(process.env.FE_BASE_URL + "cart");
  }
};

// Done till Here

module.exports.shopAcceptOrder = async (req, resp, next) => {
  const orderId = req.params.id;

  const order = await OrderModal.findOne({ _id: orderId });

  if (order) {
    order.shop_accepted = true;
    order.shop_id = req.user_id;

    await order.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, ORDER_API.SHOP_ACCEPT.message, order));
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.shipperAcceptOrder = async (req, resp, next) => {
  const orderId = req.params.id;

  const order = await OrderModal.findOne({ _id: orderId });

  if (order) {
    if (order.shop_accepted) {
      order.shipper_accepted = true;
      order.shipper_id = req.user_id;

      await order.save();

      return resp
        .status(STATUS.SUCCESS)
        .send(
          apiResponse(STATUS.SUCCESS, ORDER_API.SHIP_ACCEPT.message, order)
        );
    } else {
      return resp
        .status(STATUS.INTERNAL_SERVER)
        .send(
          errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message)
        );
    }
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};

module.exports.deliveredOrder = async (req, resp, next) => {
  const orderId = req.params.id;

  const order = await OrderModal.findOne({ _id: orderId });

  if (order) {
    if (order.shop_accepted && order.shipper_accepted) {
      const adminCommission = await AdminCommissionModal.findOne({
        shop_id: order.shop_id,
      });
      adminCommission.orders_count += adminCommission.orders_count + 1;
      adminCommission.total_payments +=
        adminCommission.total_payments + order.total_price;
      adminCommission.total_commissions +=
        adminCommission.total_commissions + order.commission_price;

      await adminCommission.save();

      order.deliverd = true;

      await order.save();

      return resp
        .status(STATUS.SUCCESS)
        .send(
          apiResponse(STATUS.SUCCESS, ORDER_API.ORDER_DELIVERED.message, order)
        );
    } else {
      return resp
        .status(STATUS.INTERNAL_SERVER)
        .send(
          errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message)
        );
    }
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
