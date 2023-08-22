const { Orders, Users, Products } = require('../db');

const findAllOrders = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const userOrders = await Orders.findAll({ where: { userId }, include: { all: true } });
      userOrders.length ? res.status(200).send(userOrders) : res.status(404).send("The user does not register orders");
    }
    const allOrders = await Orders.findAll({ include: { all: true } });
    allOrders.length ? res.status(200).send(allOrders) : res.status(404).send("There are no registered orders");
  } catch (error) {
    next(error);
  }
}

const findOneOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({ where: { id }, include: { all: true } });
    order ? res.status(200).send(order) : res.status(404).send("There is no registered order with that id");
  } catch (error) {
    next(error);
  }
}

const createOrder = async (req, res, next) => {
  try {
    const { userId, date, priceOrder } = req.body;
    const userOrder = await Users.findByPk(userId);
    const newOrder = await Orders.create({
      userId,
      state: "pending",
      date,
      priceOrder,
    })
    req.body.productId.map(id => {
      return newOrder.addProducts(id);
    });
    await newOrder.addUsers(userOrder);
    res.status(200).send({ msg: "Order create", data: newOrder });
  } catch (error) {
    next(error);
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { state } = req.body;
    const searchOrder = await Orders.findOne({ where: { id } });
    if (searchOrder) {
      searchOrder.update({
        state: req.body.state
      })
      searchOrder.save();
      res.status(200).send({ update: true, order: searchOrder });
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    next(error);
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchOrder = await Orders.findByPk(id);
    if (searchOrder) {
      await searchOrder.destroy();
      res.status(200).send({ destroy: true, msg: "Order eliminated succesfully" });
    } else {
      res.status(404).send("There is no existing order with that id");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAllOrders,
  findOneOrder,
  createOrder,
  updateOrder,
  deleteOrder
}