const { Order } = require("../db");

const updateOrderStatus = async function (req, res, next) {
  let orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findOne({ where: { id: orderId } });

    await order.update({ status: status });
    await order.reload();

    res.json({ msg: "status cambiado", newStatus: order.status });
  } catch (error) {
    next(error);
  }
};

module.export = updateOrderStatus;
