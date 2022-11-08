const { Order } = require("../db");

const getOrdersController = async function (req, res, next) {
  const orders = await Order.findAll();
};
