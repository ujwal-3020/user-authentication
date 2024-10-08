const UserService = require("./userService.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const UserController = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const decryptedPassword = decryptPassword(password);

      const user = await UserService.registerUser(
        username,
        email,
        decryptedPassword,
        role
      );
      return res.status(201).json({
        user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      if (!username && !email) {
        throw new Error("Username or email is required");
      }

      const result = await UserService.loginUser(
        username,
        email,
        password,
        role
      );

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        // token: result.token
        user: result.user,
        message: "Login successful",
      });
    } catch (error) {
      // console.log(error);

      return res.status(401).json({
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    let user = req.userInfo;
    // console.log(req.cookies);

    try {
      user = await UserService.getUser(user.email);
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
