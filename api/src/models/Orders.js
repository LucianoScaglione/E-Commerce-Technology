const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Orders', {
    userId: {
      type: DataTypes.INTEGER
    },
    state: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    priceOrder: {
      type: DataTypes.INTEGER
    },
  }, { timestamps: false })
}