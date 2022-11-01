const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { Cart } = require('../db');

const createOrder = async (req, res, next) => {
    mercadopago.configure({
        access_token: "TEST-2189850164427787-102808-b60c4d5b1e04ade5dd5fb4d2b23020eb-9479690"
    });
console.log(req.body);
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
            failure: 'http://localhost:3000/home/cart',
            pending: 'http://localhost:3001/home/mercado/status',
            success: 'http://localhost:3001/home/mercado/status',
        },
        notification_url: "https://fd10-138-186-154-240.sa.ngrok.io/home/mercado/notificar"
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


const handleStatus = async (req, res, next) => {

    const status = req.query;

    try {
        const newCart = await Cart.create({
            status: status.status,
            payment_id: status.payment_id,
            payment_type: status.payment_type,
        });

        res.redirect(`http://localhost:3000/home/${newCart.payment_id}`);

    } catch (error) {
        console.error(error);
        next();
    }
};

module.exports = { createOrder, handleStatus };