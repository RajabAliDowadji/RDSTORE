module.exports = {
  COMMON: {
    SERVER_ERROR: {
      message: "Something went wrong.",
      status: 500,
    },
    BAD_REQUEST: {
      message: "please provide valid details.",
      status: 400,
    },
  },
  ORDER_API: {
    ORDER_PLACED: {
      message: "Order place successfully.",
      status: 200,
    },
    ORDER_SUCCESS: {
      message: "Ok.",
      status: 200,
    },
    ORDER_PAYMENT: {
      message: "Order payment successfully.",
      status: 200,
    },
    SHOP_ACCEPT: {
      message: "Shop accepted order successfully.",
      status: 200,
    },
    SHIP_ACCEPT: {
      message: "Shipper accepted order successfully.",
      status: 200,
    },
    ORDER_DELIVERED: {
      message: "Order delivered successfully.",
      status: 200,
    },
  },
};
