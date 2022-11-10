const { Order, OrderDetail, Payment } = require("../db");

const getOrdersProfController = async function (req, res, next) {
  let id = req.params.id;

  try {
    const orderDetails = await OrderDetail.findAll({
      where: { professionalId: id },
      include: {
        model: Order,
        attributes: ["id", "clientId"],
        include: { model: Payment, attributes: ["id"] },
      },
    });

    if (!orderDetails) res.json({ orders: ["Ninguna compra asociada"] });
    else {
      const orders = orderDetails.map((element) => {
        return {
          orderId: element.order.id,
          clientId: element.order.clientId,
          paymentId: element.order.payment
            ? element.order.payment.id
            : "sin pago asociado",
          status: element.order.status,
          days: element.days,
          amount: element.reservationAmount,
        };
      });
      res.json({ orders });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getOrdersProfController;
