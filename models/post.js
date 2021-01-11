"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "user_profile", key: "user_id" },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
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
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "post",
    }
  );
  return Post;
};
