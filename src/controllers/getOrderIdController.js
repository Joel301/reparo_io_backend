const { Order, OrderDetail } = require("../db");

const getOrderIdController = async function (req, res, next) {
  let clientId = req.params.id;

  try {
    const clientOrder = await Order.findAll({
      where: { clientId: clientId },
      include: {
        model: OrderDetail,
        exclude: { attributes: ["clientId"] },
      },
    });

    res.json(clientOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = getOrderIdController;
