'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define(
    'Flair',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topicId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Topics',
          key: 'id',
          as: 'topicId'
        },
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
          as: 'postId'
        },
        allowNull: false,
      },
    },
    {},
  );
  Flair.associate = function(models) {
    Flair.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'Cascade'
    });
    Flair.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE'
    });
  };
  return Flair;
};