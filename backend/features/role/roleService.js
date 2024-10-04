const RoleRepository = require("./roleRepository.js");

const RoleService = {
  createRole: async (name) => {
    const role = await RoleRepository.createRole(name);
    return role;
  },
};

module.exports = RoleService;
