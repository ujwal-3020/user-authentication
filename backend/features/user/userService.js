const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt.utils.js");
const UserRepository = require("./userRepository.js");
const RoleRepository = require("../role/roleRepository.js");
const UserRoleRepository = require("../userRole/userRoleRepository.js");

const UserService = {
  registerUser: async (username, email, password, roleName) => {
    let user = await UserRepository.findUserByEmail(email);
    let role;

    if (user) {
      role = await RoleRepository.findRoleByName(roleName);
      if (!role) throw new Error("Invalid Role");

      let existingUserRole = await UserRoleRepository.findUserRole(
        user.uuid,
        role.uuid
      );
      if (existingUserRole) throw new Error("User already exists");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw new Error(
          "Use different mail or use the same password for registering as ",
          role.name
        );
    } else {
      user = await UserRepository.createUser(username, email, password);

      role = await RoleRepository.findRoleByName(roleName);
      if (!role) throw new Error("Invalid Role");

      let existingUserRole = await UserRoleRepository.findUserRole(
        user.uuid,
        role.uuid
      );
      if (existingUserRole) throw new Error("User already exists");
    }

    await UserRoleRepository.createUserRole(user.uuid, role.uuid);

    return user;
  },

  loginUser: async (email, password, roleName) => {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    const role = await RoleRepository.findRoleByName(roleName);
    if (!role) throw new Error("Invalid Role");

    const userRole = await UserRoleRepository.findUserRole(
      user.uuid,
      role.uuid
    );
    if (!userRole) throw new Error("You are not authenticated!");

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
