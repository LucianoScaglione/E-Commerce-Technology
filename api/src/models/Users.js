const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { timestamps: false });
};