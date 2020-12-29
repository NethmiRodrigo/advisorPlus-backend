"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advisor_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advisor_Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "service", key: "id" },
      },
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: "advisor_profile", key: "user_id" },
      },
    },
    {
      sequelize,
      modelName: "Advisor_Service",
      tableName: "advisor_service",
    }
  );
  return Advisor_Service;
};
