"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Qualification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: "advisor_profile", key: "user_id" },
      },
    },
    {
      sequelize,
      modelName: "Qualification",
      tableName: "qualification",
    }
  );
  return Qualification;
};
