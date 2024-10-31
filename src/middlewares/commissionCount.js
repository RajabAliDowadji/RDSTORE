module.exports.commissionCount = async (
  product,
  commission_type,
  commission
) => {
  if (commission_type.commission_name === "Ruppess") {
    return Math.round(commission);
  } else if (commission_type.commission_name === "Percentage") {
    return Math.round((product.product_price * commission) / 100);
  }
};
