const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");
const UserModel = require("./userModel.js");
const RoleModel = require("./roleModel.js");
const UserRoleModel = require("./userRoleModel.js");

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: false,
  }
);

const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize, DataTypes);
db.Role = RoleModel(sequelize, DataTypes);
db.UserRole = UserRoleModel(sequelize, DataTypes);

db.User.belongsToMany(db.Role, {
  through: db.UserRole,
});
db.Role.belongsToMany(db.User, {
  through: db.UserRole,
});

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  db,
  checkDatabaseConnection,
};
