const { OrderDetail, Order } = require("../db");

const removeOrderDetailController = async function (req, res, next) {
  let orderDetailId = req.params.id;
  try {
    const orderDetail = await OrderDetail.findOne({
      where: { id: orderDetailId },
    });

    const order = await orderDetail.getOrder();

    let price = orderDetail.reservationAmount;
    let newAmount = order.amount - price;

    await Order.update(
      { amount: newAmount },
      {
        where: { id: order.id },
      }
    );

    const removedOrderDetail = await OrderDetail.destroy({
      where: {
        id: orderDetailId,
      },
    });

    res.json({
      message: `Borrado orderDetails id: ${orderDetailId}`,
      removedOrderDetail,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeOrderDetailController;
