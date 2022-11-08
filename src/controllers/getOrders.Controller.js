const { Order } = require("../db");

const getOrdersController = async function (req, res, next) {
  try {
    const ordersDB = await Order.findAll();
    if (ordersDB) {
      const orders = ordersDB.map((element) => {
        return {
          id: element.id,
          amount: element.amount,
          clientId: client.id,
        };
      });
    }

    res.json();
  } catch (error) {}
};
