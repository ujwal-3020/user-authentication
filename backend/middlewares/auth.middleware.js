const { verifyToken } = require("../utils/jwt.utils.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const CustomError = require("../utils/customError.js");

const authenticate = asyncErrorHandler((req, res, next) => {
  // console.log("authenticate", req.cookies);

  const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    return next(new CustomError("Access denied. Please login again.", 400));
  }
  const decoded = verifyToken(token);
  // console.log(decoded);

  req.userInfo = decoded; // THIS WILL CONTAIN THE PAYLOAD
  next();
});

module.exports = authenticate;
