const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, URL, URL_FRONT } = process.env;
const { Payment } = require("../db");
const {
  sendServiceNotification,
  sendOrderNotification,
} = require("../services/emailService");

const createOrder = async (req, res, next) => {
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  if (req.body) {
    console.log(req.body);
  } else {
    console.log("sin body");
  }

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
    notification_url: `${URL}/home/mercado/notificar`,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (data) {
      res.status(200).send(data.body.init_point); //url de mercado pago
    })
    .catch(function (e) {
      console.log(e);
      next();
    });
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
  console.log("Success: ", status);
  try {
    const newPay = await Payment.create({
      clientId: req.body.clientId,
      merchant_order_id: status.merchant_order_id,
      status: status.status,
      // Estado del pago
      // pending: The user has not yet completed the payment process.
      // approved: The payment has been approved and accredited.
      // authorized: The payment has been authorized but not captured yet.
      // in_process: Payment is being reviewed.
      // in_mediation: Users have initiated a dispute.
      // rejected: Payment was rejected. The user may retry payment.
      // cancelled: Payment was cancelled by one of the parties or because time for payment has expired
      // refunded: Payment was refunded to the user.
      // charged_back: A chargeback was made in the buyer’s credit card.
      // payment_method_id: status.payment_method_id,
      payment_id: status.payment_id,
      payment_type: status.payment_type,
      //Tipo de medio de pago
      //account_money: Money in the Mercado Pago account.
      //ticket: Printed ticket
      //bank_transfer: Wire transfer.
      //atm: Payment by ATM
      //credit_card: Payment by credit card
      //debit_card: Payment by debit card
      //prepaid_card: Payment by prepaid card
      preference_id: status.preference_id,
    });

    await sendOrderNotification(req.body.clientId, req.body.orderId);
    res.redirect(`${URL_FRONT}/cart/${newPay.payment_id}`);
  } catch (error) {
    console.error(error);
    next();
  }
};

module.exports = { createOrder, handleSuccess, handlePending };
