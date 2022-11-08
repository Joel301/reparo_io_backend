const { Order } = require("../db");

const getOrdersController = async function (req, res, next) {
  try {
    const ordersDB = await Order.findAll();
    if (ordersDB) {
      const orders = ordersDB.map((element) => {
        return {
          id: element.id,
          amount: element.amount,
          status: element.status,
          clientId: element.clientId,
        };
      });

      res.json(orders);
    } else {
      res.json({ msg: "No hay ordernes" });
    }
  } catch (error) {
    next(error);
  }
};

module.export = getOrdersController;
