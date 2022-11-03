const { CartDetail, Professional } = require("../db");

const updateCartDetail = async function (req, res, next) {
  let id = req.params.id;
  const { day, type } = req.body;

  try {
    const cartDetail = await CartDetail.findOne({
      where: { id: id },
    });

    const prof = await cartDetail.getProfessional();

    const newDays = [];
    if (type === "remove") {
      const filteredDays = cartDetail.days.filter((element) => {
        return element !== day;
      });

      newDays.push(...filteredDays);
    }

    if (type === "add") {
      if (!newDays.includes(day)) newDays.push(day);
    }

    let reservationAmount = totalPrice(prof.dayPrice, newDays);

    const cart = await cartDetail.getCart();

    //Actualizando amount del carrito
    let newCartAmount =
      cart.amount - cartDetail.reservationAmount + reservationAmount;
    await cart.update({ amount: newCartAmount });

    await cartDetail.update({ days: newDays, reservationAmount });
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
