const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const RoleService = require("./roleService.js");

const RoleController = {
  createRole: asyncErrorHandler(async (req, res, next) => {
    const { name } = req.body;
    try {
      const role = await RoleService.createRole(name);
      return res.status(201).json({
        role,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }),
};

module.exports = RoleController;
