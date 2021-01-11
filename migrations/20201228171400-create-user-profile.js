"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("user_profile", {
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
    await queryInterface.dropTable("user_profile");
  },
};
