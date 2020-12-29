"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        references: { model: "post", key: "id" },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "advisor_profile", key: "user_id" },
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
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },

    {
      sequelize,
      modelName: "Comment",
      tableName: "comment",
    }
  );
  return Comment;
};
