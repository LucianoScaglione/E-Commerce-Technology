const { Products } = require('../db');
const { Op } = require("sequelize");
const api = require('../../apiJSON/api.json');

const loadDb = async () => {
  const getDb = await Products.findAll();
  return getDb;
};

const findAllProducts = async (req, res, next) => {
  try {
    const getDb = await loadDb();
    if (!getDb.length) {
      const products = api.map(p => {
        return {
          name: p.name,
          image: p.image,
          price: p.price,
          quantity: p.quantity,
          brand: p.brand,
          categorie: p.categories[0]
        }
      });
      await Products.bulkCreate(products);
      res.status(200).send(products);
    } else {
      const { name } = req.query;
      if (name) {
        const findProduct = await Products.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
        findProduct.length ? res.status(200).send(findProduct) : res.status(404).send('Product not found');
      }
      else {
        res.status(200).send(getDb)
      };
    };
  } catch (error) {
    next(error);
  };
};

const findOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const searchProduct = await Products.findByPk(id);
      searchProduct ? res.status(200).send(searchProduct) : res.status(404).send('There is not product with that id');
    };
  } catch (error) {
    next(error);
  };
};

const createProducts = async (req, res, next) => {
  try {
    const { name, image, price, quantity, brand, categorie } = req.body;
    if (!(name && price && quantity && brand && categorie)) {
      res.status(400).send("You must fill in the required fields")
    }
    const searchProduct = await Products.findOne({ where: { name } });
    if (!searchProduct) {
      const createProduct = await Products.create({
        name,
        image,
        price,
        quantity,
        brand,
        categorie
      });
      res.status(200).json({response: "Product created succesfully", product: createProduct});
    } else {
      res.status(400).send("There is already a product with that name");
    };
  } catch (error) {
    next(error);
  };
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findProduct = await Products.findByPk(id);
    if (findProduct) {
      await findProduct.update({
        name: req.body.name ? req.body.name : findProduct.name,
        image: req.body.image ? req.body.image : findProduct.image,
        price: req.body.price ? req.body.price : findProduct.price,
        quantity: req.body.quantity ? req.body.quantity : findProduct.quantity,
        brand: req.body.brand ? req.body.brand : findProduct.brand,
        categorie: req.body.categorie ? req.body.categorie : findProduct.categorie
      });
      await findProduct.save();
      res.status(200).send("Updated product");
    } else {
      res.status(400).send("There is not product with that id")
    };
  } catch (error) {
    next(error);
  };
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Products.findByPk(id);
    if (deleteProduct) {
      deleteProduct.destroy();
      res.status(200).send("Deleted product");
    } else {
      res.status(400).send("There is no product with that id");
    };
  } catch (error) {
    next(error)
  };
};

module.exports = {
  loadDb,
  findAllProducts,
  findOneProduct,
  createProducts,
  updateProduct,
  deleteProduct
};
