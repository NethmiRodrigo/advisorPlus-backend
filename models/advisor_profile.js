"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advisor_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advisor_Profile.init(
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
      status: {
        type: DataTypes.ENUM("blacklisted", "active", "suspended"),
        defaultValue: "active",
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageURL: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Advisor_Profile",
      tableName: "advisor_profile",
    }
  );
  return Advisor_Profile;
};
