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

      //Opciones disponibles de status
      const orderStatus = ["creada", "procesando", "cancelada", "completa"];

      res.json({ orders, orderStatus });
    } else {
      res.json({ msg: "No hay ordernes" });
    }
  } catch (error) {
    next(error);
  }
};

module.export = getOrdersController;
