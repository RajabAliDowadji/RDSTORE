module.exports.errorResponse = (status, message) => {
  return {
    status,
    error: {
      message: message,
    },
  };
};
