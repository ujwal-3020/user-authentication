const RoleModel = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },{
    timeStamps: false
  });

  return Role;
};

module.exports = RoleModel;
