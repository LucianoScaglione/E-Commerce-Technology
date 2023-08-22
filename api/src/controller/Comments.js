const { Comments, Products, Users } = require('../db');

const getCommentsProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchComments = await Comments.findAll({ where: { ProductId: id }, include: Users });
    searchComments.length ? res.status(200).send(searchComments) : /*res.status(404).send("There are no comments on the product")*/null;
  } catch (error) {
    next(error);
  };
};

const createComments = async (req, res, next) => {
  try {
    const { idProduct, userId } = req.params;
    const { description, calification } = req.body;
    const create = await Comments.create({
      description,
      calification,
      ProductId: idProduct,
      UserId: userId
    });
    res.send({ msg: "Comment created succesfully", data: create });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  getCommentsProduct,
  createComments
};