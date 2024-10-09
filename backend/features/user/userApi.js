const express = require("express");
const UserController = require("./userController.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/logout").post(authMiddleware, UserController.logout);
router.route("/me").get(authMiddleware, UserController.getUser);

module.exports = router;
