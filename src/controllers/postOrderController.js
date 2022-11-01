const {
  Order,
  OrderDetail,
  Professional,
  Reservation,
  Cart,
  CartDetail,
} = require("../db");
const postReservationController = require("./postReservationController");

const postOrderController = async function (req, res, next) {
  const { clientId, cartId, professionalId, days } = req.body;

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

    //EN CASO DE CREAR ORDEN DESDE UN CARRITO DE COMPRAS
    if (cartId) {
      const cart = await Cart.findOne({
        where: { id: cartId },
        include: {
          model: CartDetail,
          attributes: { exclude: ["updatedAt", "id", "cartId"] },
        },
      });

      const newOrder = await Order.create({
        clientId: cart.clientId,
        amount: cart.amount,
      });

      await cart.cartDetails.map(async (element) => {
        await newOrder.createOrderDetail({
          days: element.days,
          reservationAmount: element.reservationAmount,
          professionalId: element.professionalId,
        });
      });

      await newOrder.reload();

      res.json({
        newOrder,
        orderDetails: await newOrder.getOrderDetails(),
      });
    } else {
      //EN CASO DE COMPRAR UNA RESERVACION DESDE EL DETALLE DEL PROFESIONAL
      //Asumiento que recibe un profesional desde esta opcion
      const prof = await Professional.findOne({
        where: { id: professionalId },
      });

      let reservationAmount = totalPrice(prof.dayPrice, days);

      const newOrder = await Order.create({
        clientId,
        amount: reservationAmount,
      });

      await newOrder.createOrderDetail({
        days,
        reservationAmount,
        professionalId,
      });

      newOrder.reload();
      res.json({ newOrder, orderDetail: await newOrder.getOrderDetails() });
    }

    // const items = await orders.map(async (element) => {
    //   const prof = await Professional.findOne({
    //     where: { id: element.professionalId },
    //   });

    //   let stockError = element.days.find(
    //     (day) => !prof.availableDays.includes(day)
    //   );
    //   console.log(stockError);
    //   if (stockError)
    //     return {
    //       error: `${stockError} no esta disponible en stock. No se agregara a la reservacion de ${prof.firstName}`,
    //     };

    //   let dayPrice = await prof.getDataValue("dayPrice");

    //   //Aca va una verificaciones del precio

    //   //calculando el total segun la cantidad de dias
    //   let price = totalPrice(dayPrice, element.days);
    //   amountDB.push(price);

    //   const orderDetail = {
    //     reservationAmount: price,
    //     days: element.days,
    //     professionalId: element.professionalId,
    //   };

    //   //creando el registro en OrderDetail
    //   const item = await OrderDetail.create(orderDetail);

    //   //creando registro en Reservation
    //   //el registro de Reservatin deberia crearse al finalizar la transaccion
    //   //   const newReservation = await postReservationController(orderDetail);
    //   //   await newReservation.setOrderDetail(item);

    //   return item;
    // });

    // Promise.all(items)
    //   .then((items) => {
    //     //calculando amount de Order
    //     let amount = amountDB.reduce((prev, curr) => {
    //       return prev + curr;
    //     }, 0);

    //     return { amount, items };
    //   })
    //   .then(async (data) => {
    //     //seteando Order con amount e items
    //     const newOrder = await Order.create({
    //       amount: data.amount,
    //       clientId,
    //     });
    //     //Agregar relaciones
    //     data.items.forEach(async (element) => {
    //       if (element.error) return null;
    //       await newOrder.addOrderDetail(element);
    //     });

    //     // await newOrder.addOrderDetails(data.items);
    //     data.items.forEach(async (element) => {
    //       if (element.error) return null;
    //       await element.setOrder(newOrder);
    //     });

    //     res.json({ newOrder, orders: data.items });
    //   });
  } catch (error) {
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
