const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: false });
};