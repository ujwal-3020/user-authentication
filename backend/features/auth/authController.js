const AuthService = require("./authService.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const AuthController = {
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await AuthService.forgotPassword(req.protocol, email);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
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
  },
};

module.exports = AuthController;
