const { Order } = require("../db");

const removeOrderController = async function (req, res, next) {
  let orderId = req.params.id;
  try {
    const cancelledOrder = await Order.update(
      { status: "cancelada" },
      {
        where: {
          id: orderId,
        },
      }
    );

    res.json({ message: `Cancelada order id: ${orderId}`, cancelledOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = removeOrderController;
