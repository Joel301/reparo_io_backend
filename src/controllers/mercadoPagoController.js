const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, URL, URL_FRONT } = process.env;
const { Payment, Client, Order } = require("../db");
const {
  sendServiceNotification,
  sendOrderNotification,
} = require("../services/emailService");

const createOrder = async (req, res, next) => {
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  const { clientId, orderId } = req.body;

  //Orden de compra, obj preferencia
  const allOrders = req.body.items.map((item) => ({
    title: `Servicio de compra ID ${item.title}`,
    unit_price: item.price,
    quantity: item.quantity,
  }));

  const preference = {
    items: allOrders,
    auto_return: "approved",
    back_urls: {
      failure: URL_FRONT, // al FRONT
      pending: `${URL}/home/mercado/pending`, // al BACK
      success: `${URL}/home/mercado/success`, // al BACK
    },
    //notification_url: `https://c084-138-186-154-240.sa.ngrok.io/home/mercado/notificar`,
    notification_url: `${URL}/home/mercado/notificar`,
  };
  try {
    const data = await mercadopago.preferences.create(preference);
    res.status(200).send(data.body.init_point); //url de mercado pago
    console.log(data.body.id);

    const newPay = await Payment.create({
      id: data.body.id,
      status: "pending",
      clientId: clientId,
      orderId: orderId,
    });
  } catch (e) {
    console.log(e);
    next();
  }
};

const handlePending = async (req, res, next) => {
  // const status = req.query;
  console.log("Pending");
  //     try {
  //         const newCart = await Cart.create({
  //             merchant_order_id:status.merchant_order_id,
  //             status: status.status,
  //             payment_id: status.payment_id,
  //             payment_type: status.payment_type,
  //             preference_id:status.preference_id,
  //         });

  next();
  // } catch (error) {
  //     console.error(error);
  //     next();
  // }
};
const handleSuccess = async (req, res, next) => {
  const status = req.query;
  console.log("ESTO ES SUCCESS: ");
  try {
    console.log("PREFERENCE_ID: ", status.preference_id);
    const id = status.preference_id;
    let updPay = await Payment.findOne({ where: { id: id } });
    if (updPay) {
      updPay.payment_id = status.payment_id;
      updPay.payment_type = status.payment_type;
      updPay.merchant_order_id = status.merchant_order_id;
      updPay.status = status.status;
      await updPay.save();
    }
    //console.log(updPay);
    const order = await updPay.getOrder();
    //Cambia el status a procesada luego de realizar el pago
    await order.update({ status: "completa" });

    await sendOrderNotification(updPay.clientId, updPay.orderId);
    res.json({ updPay, message: "Pay updated" });
    res.redirect(`${URL_FRONT}/home`);
  } catch (error) {
    console.error(error);
    next();
  }
};

module.exports = { createOrder, handleSuccess, handlePending };
