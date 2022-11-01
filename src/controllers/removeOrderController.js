const { Order } = require("../db");

const removeOrderController = async function (req, res, next) {
  let orderId = req.params.id;
  try {
    const removedOrder = await Order.destroy({
      where: {
        id: orderId,
      },
    });

    res.json({ message: `Borrado order id: ${orderId}`, removedOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = removeOrderController;
