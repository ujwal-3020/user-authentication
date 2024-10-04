const { db } = require("../../models/index.js");
const { Op } = require("sequelize");

const UserRepository = {
  findUserByEmail: async (email) => {
    return await db.User.findOne({
      where: { email },
    });
  },

  createUser: async (username, email, password) => {
    return await db.User.create({
      username,
      email,
      password,
    });
  },

  findUserByPasswordToken: async (token) => {
    return await db.User.findOne({
      where: {
        passwordChangeToken: token,
        passwordChangeTokenExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });
  },

  updateUserPassword: async (user, newPassword) => {
    user.password = newPassword;
    user.passwordChangeToken = null;
    user.passwordChangeTokenExpires = null;
    user.passwordChangedAt = Date.now();
    return await user.save();
  },
};

module.exports = UserRepository;
