const DiscountModal = require("../models/Discount.modal");
const { DISCOUNT_API, COMMON } = require("../constants/Discount.message");
const { STATUS } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createDiscount = async (req, resp) => {
  const {
    name,
    image,
    coupon_code,
    description,
    discount_type,
    discount_value,
    max_discount,
    min_spend,
    percentage_cap,
    products,
    categories,
    sub_categories,
    brands,
    start_date,
    end_date,
    per_user,
    total_user,
  } = req.body;
  const discount = await DiscountModal.findOne({ name, coupon_code });
  if (!discount) {
    const createDiscount = {
      name,
      image,
      coupon_code,
      description,
      discount_detail: {
        type: discount_type,
        value: discount_value,
        max_discount: max_discount,
      },
      conditions: {
        min_spend: min_spend,
        percentage_cap: percentage_cap,
      },
      applicable_items: {
        products: products,
        categories: categories,
        sub_categories: sub_categories,
        brands: brands,
      },
      validity: {
        start_date: start_date,
        end_date: end_date,
      },
      usage_limit: {
        per_user: per_user,
        total_user: total_user,
      },
    };
    const discountModal = new DiscountModal(createDiscount);

    await discountModal.save();

    const discountResponse = {
      ...discountModal.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          DISCOUNT_API.DISCOUNT_CREATE.message,
          discountResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(
        errorResponse(
          STATUS.BAD,
          DISCOUNT_API.DISCOUNT_ALREADY_REGISTER.message
        )
      );
  }
};

module.exports.updateDiscount = async (req, resp) => {
  const discountId = req.params.id;
  const {
    name,
    image,
    coupon_code,
    description,
    discount_type,
    discount_value,
    max_discount,
    min_spend,
    percentage_cap,
    products,
    categories,
    sub_categories,
    brands,
    start_date,
    end_date,
    per_user,
    total_user,
  } = req.body;
  const discount = await DiscountModal.findOne({ id: discountId });
  if (discount) {
    discount.name = name;
    discount.image = image;
    discount.coupon_code = coupon_code;
    discount.description = description;
    discount.discount_detail = {
      type: discount_type,
      value: discount_value,
      max_discount: max_discount,
    };
    discount.conditions = {
      min_spend: min_spend,
      percentage_cap: percentage_cap,
    };
    discount.applicable_items = {
      products: products,
      categories: categories,
      sub_categories: sub_categories,
      brands: brands,
    };
    discount.validity = {
      start_date: start_date,
      end_date: end_date,
    };
    discount.usage_limit = {
      per_user: per_user,
      total_user: total_user,
    };

    await discount.save();

    const discountResponse = {
      ...discount.toObject(),
      _id: undefined,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(
          STATUS.CREATED,
          DISCOUNT_API.DISCOUNT_UPDATE.message,
          discountResponse
        )
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, DISCOUNT_API.DISCOUNT_NOT_FOUND.message));
  }
};

module.exports.deleteDiscount = async (req, resp) => {
  const discountId = req.params.id;
  const discount = await DiscountModal.findOne({
    id: discountId,
  });
  if (discount) {
    discount.activity = {
      ...discount.activity,
      is_deleted: true,
      is_active: false,
    };

    await discount.save();

    return resp
      .status(STATUS.SUCCESS)
      .send(apiResponse(STATUS.SUCCESS, DISCOUNT_API.DISCOUNT_DELETE.message));
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, DISCOUNT_API.DISCOUNT_NOT_FOUND.message));
  }
};

module.exports.getDiscounts = async (req, resp) => {
  const discounts = await DiscountModal.find();
  if (discounts) {
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(
          STATUS.SUCCESS,
          DISCOUNT_API.DISCOUNT_SUCCESS.message,
          discounts
        )
      );
  } else {
    return resp
      .status(STATUS.INTERNAL_SERVER)
      .send(errorResponse(STATUS.INTERNAL_SERVER, COMMON.SERVER_ERROR.message));
  }
};
