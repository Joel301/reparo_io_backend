const { Router } = require('express');
const router = Router();
require('dotenv').config();

const mercadopago = require("mercadopago");

const { PROD_ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
});


//Orden de compra, obj preferencia
let preference = {
    items: [
        {
            title: "Mi producto",
            unit_price: 100,
            quantity: 1,
        },
    ],
};

//Devuelve la preferencia mp con datos adicionales
mercadopago.preferences
.create(preference)
.then(function (response) {

})

.catch(function (error) {
    console.log(error);
});