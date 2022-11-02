const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { Cart } = require('../db');

const createOrder = async (req, res, next) => {
    mercadopago.configure({
        access_token: ACCESS_TOKEN
    });
    if(req.body){ console.log(req.body);}
    else { console.log("sin body");}

    //Orden de compra, obj preferencia
  const allOrders = req.body.map(item => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    const preference = {
        items: allOrders,
        auto_return: 'approved',
        back_urls: {
            failure: 'http://localhost:3000/home/',
            pending: 'http://localhost:3001/home/mercado/pending',
            success: 'http://localhost:3001/home/mercado/success',
        },
        notification_url: "https://b5ea-138-186-154-240.sa.ngrok.io/home/mercado/notificar"
    };

    mercadopago.preferences.create(preference)
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
 console.log("Success: ",status);
    try {
        const newCart = await Cart.create({
            merchant_order_id:status.merchant_order_id,
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
            preference_id:status.preference_id,
        });

        res.redirect(`http://localhost:3000/home/${newCart.payment_id}`);

    } catch (error) {
        console.error(error);
        next();
    }
};

module.exports = { createOrder, handleSuccess ,handlePending};