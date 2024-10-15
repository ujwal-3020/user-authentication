const sendEmail = require("../../utils/mail.utils.js");
const crypto = require("crypto");
const UserRepository = require("../user/userRepository.js");
const CustomError = require("../../utils/customError.js");
const bcrypt = require("bcryptjs");

const AuthService = {
  forgotPassword: async (protocol, email, next) => {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return next(
        new CustomError("User with the given email does not exist!", 401)
      );
    }

    const passwordChangeToken = await user.createPasswordChangeToken();

    const resetURL = `${protocol}://192.1.200.84:5173/reset-password/${passwordChangeToken}`;

    const message = `<p>We have received a request to reset your password. Please use the link below to reset your password:</p>
        <p><a href="${resetURL}">Reset Password</a></p>
        <p>This reset password link will expire in 15 minutes.</p>`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset",
        message,
      });
    } catch (error) {
      user.passwordChangeToken = undefined;
      user.passwordChangeTokenExpires = undefined;
      await user.save({
        validateBeforeSave: false,
      });

      return next(
        new CustomError(
          "There was an error sending password reset email. Please try again later!",
          500
        )
      );
    }

    return {
      status: "success",
      message: `Password reset link has been sent to ${user.email}`,
    };
  },

  resetPassword: async (token, newPassword, next) => {
    token = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserRepository.findUserByPasswordToken(token);

    if (!user) {
      return next(
        new CustomError(
          "Your password reset token is either invalid or expired. Please request a new link.",
          401
        )
      );
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return next(
        new CustomError("New password should not be same as old password.", 400)
      );
    }

    await UserRepository.updateUserPassword(user, newPassword, next);

    return {
      status: "success",
      message: "Password has been reset. Please go to login page",
    };
  },
};

module.exports = AuthService;
