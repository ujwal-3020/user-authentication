const UserService = require("./userService.js");

const UserController = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const user = await UserService.registerUser(
        username,
        email,
        password,
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
    const { email, password, role } = req.body;
    try {
      const result = await UserService.loginUser(email, password, role); // FOR HEADERS

      // res.cookie("token", res.token, {
      //   httpOnly: true,
      //   secure: true,
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      // });

      return res.status(200).json({
        token: result.token, // FOR HEADERS, SAVE THIS IN LOCAL STORAGE THROUGH FRONTEND CODE
        user: result.user,
        message: "Login successful",
      });
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    let user = req.userInfo;
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
