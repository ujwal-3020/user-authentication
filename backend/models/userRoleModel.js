const UserRoleModel = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("user_roles", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // user_uuid: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'uuid',
    //   },
    // },
    // role_uuid: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: Role,
    //     key: 'uuid',
    //   },
    // },
  }, {
    paranoid: true
  });

  return UserRole
};

module.exports = UserRoleModel