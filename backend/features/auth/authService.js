const sendEmail = require("../../utils/mail.utils.js");
const crypto = require("crypto");
const UserRepository = require("../user/userRepository.js");

const AuthService = {
  forgotPassword: async (protocol, email) => {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) throw new Error("User not exist");

    // GENERATE A RESET TOKEN (RANDOM SECURE STRING)
    const passwordChangeToken = await user.createPasswordChangeToken();

    const resetURL = `${protocol}://localhost:5173/reset-password/${passwordChangeToken}`;

    const message = `<p>We have received a request to reset your password. Please use the link below to reset your password:</p>
        <p><a href="${resetURL}">Reset Password</a></p>
        <p>This reset password link will expire in 15 minutes.</p>`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    return {
      status: "success",
      message: `Password reset link has been sent to ${user.email}`,
    };
  },

  resetPassword: async (token, newPassword) => {
    token = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserRepository.findUserByPasswordToken(token);

    if (!user) {
      throw new Error("Token is invalid or has expired");
    }

    await UserRepository.updateUserPassword(user, newPassword);

    return {
      message: "Password has been reset. Please go to login page",
    };
  },
};

module.exports = AuthService;
