const { CartDetail, Professional } = require("../db");

const updateCartDetail = async function (req, res, next) {
  let id = req.params.id;
  const { day, type } = req.body;

  try {
    const cartDetail = await CartDetail.findOne({
      where: { id: id },
    });

    const prof = await cartDetail.getProfessional();

    const newDays = [...cartDetail.days];
    if (type === "remove") {
      const filteredDays = newDays.filter((element) => {
        return element !== day;
      });

      newDays.splice(0, newDays.length, ...filteredDays);
    }

    if (type === "add") {
      if (!newDays.includes(day)) newDays.push(day);
    }

    let reservationAmount = totalPrice(prof.dayPrice, newDays);
    await cartDetail.update({ days: newDays, reservationAmount });

    const cart = await cartDetail.getCart();

    //Actualizando amount del carrito
    const cartDetails = await cart.getCartDetails();

    const cartAmount = cartDetails.map((element) => {
      return element.reservationAmount;
    });
    let newCartAmount = cartAmount.reduce((prev, next) => prev + next);

    //Actualizando valores
    await cart.update({ amount: newCartAmount });

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
