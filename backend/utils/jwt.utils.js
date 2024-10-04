const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30 days" });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required for verification.");
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // FOR COOKIES
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
