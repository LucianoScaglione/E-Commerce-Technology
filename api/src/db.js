require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/products`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Products, Users, Orders, Favorites, Comments } = sequelize.models;

Orders.belongsToMany(Products, { through: "order_product" });
Products.belongsToMany(Orders, { through: "order_product" });

Users.belongsToMany(Orders, { through: "user_order" });
Orders.belongsToMany(Users, { through: "user_order" });

Favorites.belongsToMany(Products, { through: "favorites_products" });
Products.belongsToMany(Favorites, { through: "favorites_products" });

Products.hasMany(Comments);
Comments.belongsTo(Products);

Users.hasMany(Comments);
Comments.belongsTo(Users);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

