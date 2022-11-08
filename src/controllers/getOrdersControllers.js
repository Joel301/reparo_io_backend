const { Order, OrderDetails } = require("../db");

const getOrdersController = async function (req, res, next) {
  try {
    const ordersDB = await Order.findAll({
      include: {
        model: OrderDetails,
        attributes: ["professionalId", "reservationAmount", "days"],
      },
    });
    if (ordersDB) {
      const orders = ordersDB.map((element) => {
        return {
          id: element.id,
          amount: element.amount,
          status: element.status,
          clientId: element.clientId,
          date: element.createdAt,
          orderDetails: element.orderDetails,
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

module.exports = getOrdersController;
