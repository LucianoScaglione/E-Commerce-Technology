const { Orders, Users } = require('../db');

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
    const user = await Users.findByPk(req.body.userId);
    const createOrder = await Orders.create({
      userId: req.body.userId,
      state: "pending",
      date: new Date(),
      priceOrder: req.body.priceOrder,
      productId: req.body.productId,
    });
    req.body.productId.map(async e => { await createOrder.addProducts(e) });
    await createOrder.addUsers(user);
    res.send(createOrder);
  } catch (error) {
    next(error);
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
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
  };
};

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
  };
};

module.exports = {
  findAllOrders,
  findOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
}