const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comments', {
    userId: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING,
    },
    calification: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, { timestamps: false });
};