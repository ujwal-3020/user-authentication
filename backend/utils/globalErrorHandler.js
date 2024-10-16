module.exports = (error, _1, res, _2) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
