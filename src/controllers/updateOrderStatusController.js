const { Order } = require("../db");
const { sendStatusChangeNotification } = require("../services/emailService");

const updateOrderStatus = async function (req, res, next) {
  let orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findOne({ where: { id: orderId } });

    let oldStatus = order.status;

    await order.update({ status: status });
    await order.reload();

    const client = await order.getClient();

    await sendStatusChangeNotification(client.id, order.id, oldStatus);

    res.json({ msg: "status cambiado", newStatus: order.status });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOrderStatus;
