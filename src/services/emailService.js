// Install with: npm install @trycourier/courier
const { CourierClient } = require("@trycourier/courier");
const { Client, Order } = require("../db");

const courier = CourierClient({
  authorizationToken: "pk_prod_RQGPZM7PF34F0QK42QNKNGDR4Z48",
});

const sendOrderNotification = async function (clientId, orderId) {
  const client = await Client.findOne({
    where: { id: clientId },
  });

  const order = await Order.findOne({
    where: { id: orderId },
  });

  const { requestId } = await courier.send({
    message: {
      to: {
        email: client.email,
      },
      template: "W3886NM7SZ4NGRJ8KQWXNX1765JM",
      data: {
        name:
          client.firstName.charAt(0).toUpperCase() + client.firstName.slice(1),
        orderId: order.id,
        amount: order.amount,
      },
    },
  });
};

module.exports = {
  sendOrderNotification,
};
