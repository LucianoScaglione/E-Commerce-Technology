const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT
    },
    price: {  
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    brand: {
      type: DataTypes.STRING
    },
    categorie: { 
      type: DataTypes.STRING
    }
  }, { timestamps: false })
}