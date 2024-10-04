const express = require("express");
const AuthController = require("./authController.js");

const router = express.Router();

router.route("/forgot-password").post(AuthController.forgotPassword);
router.route("/reset-password/:token").post(AuthController.resetPassword);

module.exports = router;
