const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const RoleService = require("./roleService.js");

const RoleController = {
  createRole: asyncErrorHandler(async (req, res, next) => {
    const { name } = req.body;

    const role = await RoleService.createRole(name);

    return res.status(201).json({
      role,
    });
  }),
};

module.exports = RoleController;
