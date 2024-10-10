const AuthService = require("./authService.js");
const decryptPassword = require("../../utils/decryptPassword.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const CustomError = require("../../utils/customError.js");

const AuthController = {
  forgotPassword: asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
      return next(
        new CustomError(
          "Please provide your email ID to recieve password reset link.",
          400
        )
      );
    }

    const result = await AuthService.forgotPassword(req.protocol, email, next);
    return res.status(200).json(result);
  }),

  resetPassword: asyncErrorHandler(async (req, res, next) => {
    const { password } = req.body;
    const token = req.params.token;

    try {
      const decryptedPassword = decryptPassword(password);
      const result = await AuthService.resetPassword(token, decryptedPassword);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }),
};

module.exports = AuthController;
