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
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("dob");
          if (!rawValue) return null;

          const date = new Date(rawValue);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        },
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
