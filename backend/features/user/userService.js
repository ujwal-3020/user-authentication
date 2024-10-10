const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt.utils.js");
const UserRepository = require("./userRepository.js");
const RoleRepository = require("../role/roleRepository.js");
const UserRoleRepository = require("../userRole/userRoleRepository.js");
const CustomError = require("../../utils/customError.js");

const UserService = {
  registerUser: async (username, email, password, roleName, next) => {
    let user = await UserRepository.findUserByEmail(email);
    let role;

    if (user) {
      role = await RoleRepository.findRoleByName(roleName);
      if (!role) {
        return next(new CustomError("Invalid Role", 400));
      }

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
            "Use different email ID or use the same password for registering as ",
            role.name
          )
        );
      }
    } else {
      user = await UserRepository.createUser(username, email, password);

      role = await RoleRepository.findRoleByName(roleName);
      if (!role) {
        return next(new CustomError("Invalid Role", 400));
      }
    }

    await UserRoleRepository.createUserRole(user.uuid, role.uuid);

    return user;
  },

  loginUser: async (loginIdentifier, password, roleName) => {
    const user = await UserRepository.findUserByEmailOrUsername(
      loginIdentifier
    );

    if (!user)
      throw new Error(
        "No account found with this email or username. Please enter correct email or username."
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error("Password is wrong. Please enter a valid password.");

    const role = await RoleRepository.findRoleByName(roleName);
    if (!role) throw new Error("You cannot register for this role.");

    const userRole = await UserRoleRepository.findUserRole(
      user.uuid,
      role.uuid
    );
    if (!userRole)
      throw new Error(
        `You cannot login as ${roleName}. If you are already registered as ${roleName} then please contact support.`
      );

    const token = generateToken({
      id: user.uuid,
      email: user.email,
      role: roleName,
    });

    return {
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
