"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Role.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM("advisor", "user"),
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "User_Role",
      tableName: "user_role",
    }
  );
  return User_Role;
};
