"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("user_role", {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM("advisor", "user"),
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_role");
  },
};
