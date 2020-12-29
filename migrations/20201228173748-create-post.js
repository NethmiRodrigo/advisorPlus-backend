"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("post", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "user_profile", key: "user_id" },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "suspended"),
        defaultValue: "active",
      },
      audience: {
        type: DataTypes.ENUM("public", "private", "consultants"),
        defaultValue: "public",
      },
      service: {
        type: DataTypes.INTEGER,
        references: { model: "service", key: "id" },
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
    await queryInterface.dropTable("post");
  },
};
