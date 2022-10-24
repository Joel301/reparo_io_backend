const { Order, OrderDetail, Professional } = require("../db");

const postOrderController = async function (req, res, next) {
  const { amount, orders, clientId } = req.body;

  try {
    //Deberia haber una busqueda del dayPrice de cada Professional en la orden
    //y compararlo con el enviado desde el front como metodo de verficacion

    //Teniendo en cuenta que:
    //OrderDetails.belongsTo(Professional) & Order.hasMany(OrderDetails)

    //Para calcular amount de Order
    const amountDB = [];

    //seteando OrderDetails de Order

    const items = orders.map(async (element) => {
      try {
        const prof = await Professional.findOne({
          where: { id: element.professionalId },
        });

        let dayPrice = prof.getDataValue("dayPrice");

        //calculando el total segun la cantidad de dias
        let price = totalPrice(dayPrice, element.startDay, element.endDay);
        amountDB.push(price);

        //creando el registro
        const item = await OrderDetail.create({
          reservationAmount: element.reservationAmount,
          startDay: element.startDay,
          endDay: element.endDay,
          professionalId: element.professionalId,
        });

        return item;
      } catch (error) {
        throw error;
      }
    });

    Promise.all(items)
      .then((items) => {
        //calculando amount de Order
        let amount = amountDB.reduce((prev, curr) => {
          return prev + curr;
        });

        return { amount, items };
      })
      .then(async (data) => {
        //seteando Order con amount e items
        const newOrder = await Order.create({
          amount: data.amount,
          clientId,
        });
        await newOrder.addOrderDetails(data.items);
        data.items.forEach(async (element) => {
          await element.setOrder(newOrder);
        });
        res.json({ message: "order created" });
      });
  } catch (error) {
    next(error);
  }
};

function totalPrice(price, start, end) {
  let a = new Date(start).getTime();
  let b = new Date(end).getTime();
  let dif = b - a;
  if (dif === 0) return price;
  let total = (price * dif) / (1000 * 60 * 60 * 24); //transformacion milisegundos

  return total;
}

module.exports = postOrderController;
