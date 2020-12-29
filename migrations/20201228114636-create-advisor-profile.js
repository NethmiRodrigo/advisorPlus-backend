"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("advisor_profile", {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
    await queryInterface.dropTable("advisor_profile");
  },
};
