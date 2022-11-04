const { CartDetail, Professional, Cart } = require("../db");

const postCartDetail = async function (req, res, next) {
  const { days, professionalId, clientId } = req.body;

  try {
    //Buscando profesional asociado al servicio de interes
    const prof = await Professional.findOne({
      where: { id: professionalId },
    });

    const cart = await Cart.findOne({
      where: { clientId: clientId },
      include: CartDetail,
    });

    //Creando el nuevo item que va dentro del carrito
    let reservationAmount = totalPrice(prof.dayPrice, days);

    const newCartDetail = await CartDetail.create({
      reservationAmount,
      days,
      professionalId,
      cartId: cart.id,
    });

    await prof.addCartDetail(newCartDetail);

    //Agregando el nuevo item al carrito
    await cart.addCartDetail(newCartDetail);

    //Recalculando total del carrito
    await cart.reload();

    const cartAmount = cart.cartDetails.map((element) => {
      return element.reservationAmount;
    });

    let newCartAmount = cartAmount.reduce((prev, next) => prev + next);

    await cart.update({ amount: newCartAmount });

    res.json({ message: "creado", newCartDetail });
  } catch (error) {
    next(error);
  }
};

function totalPrice(price, days) {
  let total = price * days.length;
  return total;
}

module.exports = postCartDetail;
