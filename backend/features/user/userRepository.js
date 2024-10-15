const { db } = require("../../models/index.js");
const { Op } = require("sequelize");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const UserRepository = {
  findUserByEmail: async (email) => {
    return await db.User.findOne({
      where: { email },
      attributes: ["uuid", "username", "dob", "email", "password"],
    });
  },

  findUserByUsername: async (username) => {
    return await db.User.findOne({
      where: { username },
      attributes: ["uuid", "username", "dob", "email"],
    });
  },

  findUserByEmailOrUsername: async (loginIdentifier) => {
    return await db.User.findOne({
      where: {
        [Op.or]: [
          {
            email: loginIdentifier || "",
          },
          {
            username: loginIdentifier || "",
          },
        ],
      },
      attributes: ["uuid", "username", "dob", "email", "password"],
    });
  },

  createUser: async (username, email, password, dob) => {
    return await db.User.create({
      username,
      email,
      password,
      dob,
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
      attributes: [
        "uuid",
        "username",
        "dob",
        "email",
        "password",
        "passwordChangeToken",
        "passwordChangeTokenExpires",
        "passwordChangedAt",
      ],
    });
  },

  updateUserPassword: asyncErrorHandler(async (user, newPassword, next) => {
    user.password = newPassword;
    user.passwordChangeToken = null;
    user.passwordChangeTokenExpires = null;
    user.passwordChangedAt = Date.now();
    return await user.save();
  }),
};

module.exports = UserRepository;
