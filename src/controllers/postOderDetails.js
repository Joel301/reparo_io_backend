const { OrderDetail } = require("../db");

const postOrderDetails = async function (req, res, next) {
  const { endDay, startDay, reservationAmount } = req.body;

  await OrderDetail.create({
    reservationAmount,
    endDay: new Date(endDay),
    startDay: new Date(startDay),
  });

  res.json({ message: "creado" });
};

module.exports = postOrderDetails;
