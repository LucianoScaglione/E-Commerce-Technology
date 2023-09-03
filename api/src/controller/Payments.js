const axios = require('axios');

const urlRedirect = "http://127.0.0.1:5173/";

const createPayment = async (item, id) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: item,
      back_urls: {
        failure: `http://localhost:3001/payments/failure/${id}`,
        pending: `http://localhost:3001/payments/pending/${id}`,
        success: `http://localhost:3001/payments/success/${id}`,
      }
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    const result = [
      payment.data.init_point,
      payment.data.id,
      payment.data.items.map((e) => {
        return e;
      }),
    ];
    return result;
  } catch (error) {
    console.log(error);
  };
};

const createInformationOrderWithPayment = async (req, res, next) => {
  try {
    const orden = await axios.post('http://localhost:3001/orders', {
      userId: req.body.userId,
      state: "pending",
      date: new Date(),
      priceOrder: req.body.price,
      productId: req.body.productId,
    });
    const resultado = await createPayment(req.body.item, orden.data.id);
    res.send(resultado);
  } catch (error) {
    next(error);
  };
};

const orderSuccess = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { state: "completed" });
    res.redirect(urlRedirect);
  } catch (error) {
    next(error);
  };
};

const orderPending = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { state: "pending" });
    res.redirect(urlRedirect);
  } catch (error) {
    next(error);
  };
};

const orderFailure = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { state: "canceled" });
    res.redirect(urlRedirect);
  } catch (error) {
    next(error);
  };
};

module.exports = {
  createInformationOrderWithPayment,
  createPayment,
  orderSuccess,
  orderPending,
  orderFailure
};