const { verifyToken } = require("../utils/jwt.utils.js");

const authenticate = (req, res, next) => {
  // const token = req.header("Authorization").split(" ")[1]; // WHEN PASSING TOKEN THROUGH HEADER
  // const token = req.header("Authorization").replace('Bearer ', '')

  const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
    });
  }
  try {
    const decoded = verifyToken(token);
    // console.log(decoded);

    req.userInfo = decoded; // THIS WILL CONTAIN THE PAYLOAD
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = authenticate;
