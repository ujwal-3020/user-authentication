const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt.utils.js");
const UserRepository = require("./userRepository.js");
const RoleRepository = require("../role/roleRepository.js");
const UserRoleRepository = require("../userRole/userRoleRepository.js");
const CustomError = require("../../utils/customError.js");

const UserService = {
  registerUser: async (username, email, password, roleName, next) => {
    let user = await UserRepository.findUserByEmail(email);
    let role = await RoleRepository.findRoleByName(roleName);
    if (!role) {
      return next(new CustomError("Invalid Role", 400));
    }

    if (user) {
      let existingUserRole = await UserRoleRepository.findUserRole(
        user.uuid,
        role.uuid
      );
      if (existingUserRole) {
        return next(
          new CustomError("User already exists. Please try to login", 400)
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(
          new CustomError(
            "Use different email ID or use the same password for registering as " +
              role.name,
            400
          )
        );
      }

      const isSameUsername = username == user.username;
      if (!isSameUsername) {
        return next(
          new CustomError(
            "Use different email ID or use the same username for registering as " +
              role.name,
            400
          )
        );
      }
    } else {
      user = await UserRepository.findUserByUsername(username);
      if (user) {
        return next(
          new CustomError(
            "This username is already in use. Please try another one.",
            400
          )
        );
      }
      user = await UserRepository.createUser(username, email, password);
    }

    await UserRoleRepository.createUserRole(user.uuid, role.uuid);

    return user;
  },

  loginUser: async (loginIdentifier, password, roleName, next) => {
    const user = await UserRepository.findUserByEmailOrUsername(
      loginIdentifier
    );
    if (!user) {
      return next(
        new CustomError(
          "No account found with this email or username. Please enter correct email or username.",
          400
        )
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(
        new CustomError(
          "Sorry, your password is incorrect. Please enter correct password.",
          400
        )
      );
    }

    const role = await RoleRepository.findRoleByName(roleName);
    if (!role) {
      return next(new CustomError("Invalid Role", 400));
    }

    const userRole = await UserRoleRepository.findUserRole(
      user.uuid,
      role.uuid
    );
    if (!userRole) {
      return next(
        new CustomError(
          `You cannot login as ${roleName}. If you are already registered as ${roleName} then please contact support.`,
          400
        )
      );
    }

    const token = generateToken({
      id: user.uuid,
      email: user.email,
      role_id: role.uuid,
    });

    return {
      status: "success",
      token,
      user,
    };
  },

  getUser: async (email) => {
    const user = await UserRepository.findUserByEmail(email);
    return user;
  },
};

module.exports = UserService;
