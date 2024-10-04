const { db } = require("../../models/index.js");

const RoleRepository = {
  findRoleByName: async (roleName) => {
    return await db.Role.findOne({
      where: { name: roleName },
    });
  },
  createRole: async (roleName) => {
    return await db.Role.create({
      name: roleName,
    });
  },
};

module.exports = RoleRepository;
