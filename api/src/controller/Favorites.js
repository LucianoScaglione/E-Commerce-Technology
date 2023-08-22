const { Favorites, Products } = require('../db');

const createFavorite = async (req, res, next) => {
  try {
    const { productId, userId } = req.body; 
    console.log("le llega: ", req.body);
    const searchFavorite = await Favorites.findAll({ where: { userId }, include: Products });
    if (searchFavorite.length) {
      const searchProduct = searchFavorite.map(p => p.Products).flat().find(s => s.id === productId);
      if (searchProduct) {
        res.status(404).send("There is already a product with that id added to favorite");
      } else {
        const create = await Favorites.create({ userId });
        console.log("tabla en sql: ", create);
        const searchProduct = await Products.findByPk(productId);
        console.log("producto para agregar a favorito: ", searchProduct);
        await create.addProducts(searchProduct);
        res.status(200).send("Favorite created");
      };
    } else {
      const create = await Favorites.create({ userId });
      const searchProduct = await Products.findByPk(productId);
      await create.addProducts(searchProduct);
      res.status(200).send("Favorite created");
    };
  } catch (error) {
    next(error);
  };
};

const findAllFavoritesUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findFavorites = await Favorites.findAll({ where: { userId: id }, include: Products });
    findFavorites.length ? res.send(findFavorites) : res.status(404).send("There are no favorites existing");
  } catch (error) {
    next(error);
  };
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchFavorite = await Favorites.findByPk(id);
    if (searchFavorite) {
      await Favorites.destroy({ where: { id } });
      res.send("Favorite eliminated succesfully");
    } else {
      res.status(404).send("There is no favorite with that id");
    };
  } catch (error) {
    next(error);
  };
};

module.exports = {
  findAllFavoritesUser,
  createFavorite,
  deleteFavorite
};