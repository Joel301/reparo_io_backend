const mercadopago = require('mercadopago');
require('dotenv').config();
const { PROD_ACCESS_TOKEN } = process.env;
const { Cart } = require('../db');

const createOrder = async (req, res, next) => {
    mercadopago.configure({
        access_token: PROD_ACCESS_TOKEN
    });

    //Orden de compra, obj preferencia
    const allOrders = carrito.map(item => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    // let preference = {
    //     items: [
    //         {
    //             title: "Mi producto",
    //             unit_price: 100,
    //             quantity: 1,
    //         },
    //     ],
    // };

    const preference = {
        items: allOrders,
        auto_return: 'approved',
        back_urls: {
            failure: 'http://localhost:3000/home/cart',
            pending: 'http://localhost:3001/home/mercado/status',
            success: 'http://localhost:3001/home/mercado/status',
        },
    };

    //Devuelve la preferencia mp con datos adicionales
    mercadopago.preferences.create(preference)
        .then((data) => {
            res.status(200).send({ url: data.response.init_point }); //url de mercado pago
        })
        .catch((e) => {
            res.status(400).json(e);
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