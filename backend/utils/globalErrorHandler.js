module.exports = (error, _, res, _) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
