require("dotenv").config();
const Razorpay = require("razorpay");

const secretpaymentaccessKeyId = process.env.RAZOR_SECRET_KEY;
const paymentaccessKeyId = process.env.RAZOR_ACCESS_KEY_ID;

module.exports.instance = new Razorpay({
  key_id: paymentaccessKeyId,
  key_secret: secretpaymentaccessKeyId,
});
