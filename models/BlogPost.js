const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class BlogPost extends Model { };

BlogPost.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
  }
)

module.exports = BlogPost