const { Order } = require("../db");

const updateOrderStatus = async function (req, res, next) {
  let orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await Order.findOne({ where: { id: orderId } });

    await order.update({ status: status });
  } catch (error) {}
};
