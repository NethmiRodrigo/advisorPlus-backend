"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Profile.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: "user_role", key: "user_id" },
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"), //Do not change this enum.
      },
      status: {
        type: DataTypes.ENUM("blacklisted", "active", "suspended"),
        defaultValue: "active",
      },
      imageURL: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User_Profile",
      tableName: "user_profile",
    }
  );
  return User_Profile;
};
