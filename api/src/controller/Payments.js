const mercadopago = require('mercadopago');

const createOrderMP = async (req, res, next) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_API_KEY
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: 'Test', // Nombre producto
        quantity: 1,
        currency_id: 'ARS', // Moneda a pagar (Peso argentino)
        unit_price: 10.5 // Precio total
      }
    ],
    back_urls: {
      success: "http://localhost:3001/success", //Transacción satisfactoria
      failure: "http://localhost:3001/failure", //Transacción fallida
      pending: "http://localhost:3001/pending" //Transacción pendiente
    }
  });
  console.log(result);
  const infoPayment = [
    result.body.id,
    result.body.init_point,
    result.body.items
  ]
  res.send(infoPayment);
};

const orderSuccess = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrderMP
}
