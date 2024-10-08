const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordChangeToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordChangeTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password && !user._previousDataValues.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
            user.passwordChangedAt = new Date();
          }
        },
      },
    }
  );

  User.prototype.createPasswordChangeToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordChangeToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordChangeTokenExpires = Date.now() + 15 * 60 * 1000;

    await this.save();

    return resetToken;
  };

  return User;
};

module.exports = UserModel;
