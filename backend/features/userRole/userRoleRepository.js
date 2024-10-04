const { db } = require("../../models/index.js");

const UserRoleRepository = {
  findUserRole: async (userUuid, roleUuid) => {
    return await db.UserRole.findOne({
      where: {
        userUuid,
        roleUuid,
      },
    });
  },
  createUserRole: async (userUuid, roleUuid) => {
    return await db.UserRole.create({
      userUuid,
      roleUuid,
    });
  },
};

module.exports = UserRoleRepository;
