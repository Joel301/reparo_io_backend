const { CartDetail, Professional } = require("../db");

const updateCartDetail = async function (req, res, next) {
  let id = req.params.id;
  const { days } = req.body;

  try {
    const cartDetail = await CartDetail.findOne({
      where: { id: id },
    });

    const prof = await cartDetail.getProfessional();

    let reservationAmount = totalPrice(prof.dayPrice, days);

    const cart = await cartDetail.getCart();

    //Actualizando amount del carrito
    let newCartAmount =
      cart.amount - cartDetail.reservationAmount + reservationAmount;
    await cart.update({ amount: newCartAmount });

    await cartDetail.update({ days: days, reservationAmount });
    await cartDetail.reload();

    res.json({ cartDetail, cartAmount: newCartAmount });
  } catch (error) {
    next(error);
  }
};

function totalPrice(price, days) {
  let total = price * days.length;
  return total;
}

module.exports = updateCartDetail;
