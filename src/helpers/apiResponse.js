module.exports.apiResponse = (status, message, data = null, meta = null) => {
  return { status, message, data, meta };
};
