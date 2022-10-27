const { Order, OrderDetail, Professional, Reservation } = require("../db");
const postReservationController = require("./postReservationController");

const postOrderController = async function (req, res, next) {
  const { orders, clientId } = req.body;

  try {
    //Deberia haber una busqueda del dayPrice de cada Professional en la orden
    //y compararlo con el enviado desde el front como metodo de verficacion

    //Teniendo en cuenta que:
    //OrderDetails.belongsTo(Professional) & Order.hasMany(OrderDetails)

    //Para calcular amount de Order
    const amountDB = [];

    //seteando OrderDetails de Order
    //{
    //professionalId,
    //days,
    //reservationAmount
    //}

    const items = orders.map(async (element) => {
      const prof = await Professional.findOne({
        where: { id: element.professionalId },
      });

      let dayPrice = await prof.getDataValue("dayPrice");

      //Aca va una verificaciones del precio

      //calculando el total segun la cantidad de dias
      let price = totalPrice(dayPrice, element.days);
      amountDB.push(price);

      const orderDetail = {
        reservationAmount: price,
        days: element.days,
        professionalId: element.professionalId,
      };

      //creando el registro en OrderDetail
      const item = await OrderDetail.create(orderDetail);

      //creando registro en Reservation
      const newReservation = await postReservationController(orderDetail);
      await newReservation.setOrderDetail(item);
      return item;
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
    console.log("HI FROM CATCH");
    next(error);
  }
};

function totalPrice(price, days) {
  // let a = new Date(start).getTime();
  // let b = new Date(end).getTime();
  // let dif = b - a;
  // if (dif === 0) return price;
  // let total = (price * dif) / (1000 * 60 * 60 * 24); //transformacion milisegundos
  let total = price * days.length;
  return total;
}

module.exports = postOrderController;
