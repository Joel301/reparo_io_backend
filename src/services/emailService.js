// Install with: npm install @trycourier/courier
const { CourierClient } = require("@trycourier/courier");
const { Client, Order } = require("../db");
const { COURIER_TOKEN } = process.env;

const courier = CourierClient({
  authorizationToken: COURIER_TOKEN,
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

const sendStatusChangeNotification = async function (
  clientId,
  orderId,
  oldStatus
) {
  const client = await Client.findOne({ where: { id: clientId } });
  const order = await Order.findOne({ where: { id: orderId } });

  const { requestId } = await courier.send({
    message: {
      to: {
        email: client.email,
      },
      template: "X5SXCPH6RPMHECMN0040JCX5P8TZ",
      data: {
        name:
          client.firstName.charAt(0).toUpperCase() + client.firstName.slice(1),
        orderId: order.id,
        oldStatus,
        status: order.status,
      },
    },
  });
};

module.exports = {
  sendOrderNotification,
  sendStatusChangeNotification,
};
