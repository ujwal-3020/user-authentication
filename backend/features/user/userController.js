const UserService = require("./userService.js");
const decryptPassword = require("../../utils/decryptPassword.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const CustomError = require("../../utils/customError.js");

const UserController = {
  register: asyncErrorHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !role || !password) {
      return next(
        new CustomError("Please enter all the details to register yourself.")
      );
    }

    const decryptedPassword = decryptPassword(password);

    const user = await UserService.registerUser(
      username,
      email,
      decryptedPassword,
      role,
      next
    );

    return res.status(201).json({
      user,
    });
  }),

  login: asyncErrorHandler(async (req, res, next) => {
    const { loginIdentifier, password, role } = req.body;
    if (!loginIdentifier || !password || !role) {
      return next(
        new CustomError(
          "Please enter your username or email, password and select a role for loggin in.",
          400
        )
      );
    }

    const decryptedPassword = decryptPassword(password);

    const result = await UserService.loginUser(
      loginIdentifier,
      decryptedPassword,
      role,
      next
    );

    await res.cookie("token", result.token, {
      httpOnly: true,
      path: "/",
      // secure: true,
      // sameSite: "Strict",
      maxAge: 2592000000,
    });

    return res.status(200).json({
      user: result.user,
      message: "Login successful",
    });
  }),

  getUser: asyncErrorHandler(async (req, res, next) => {
    let user = req.userInfo;

    user = await UserService.getUser(user.email);

    return res.status(200).json({
      user,
    });
  }),

  logout: asyncErrorHandler(async (req, res, next) => {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  }),
};

module.exports = UserController;
