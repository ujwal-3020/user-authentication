const RoleService = require("../features/role/roleService.js");

const seedRoles = async () => {
  const roles = ["Customer", "Restaurant Owner", "Delivery Partner"];

  for (const roleName of roles) {
    await RoleService.createRole(roleName);
  }
};

module.exports = {
  seedRoles,
};
