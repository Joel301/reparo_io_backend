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

    await cartDetail.update({ days: days, reservationAmount });
    await cartDetail.reload();
    res.json(cartDetail);
  } catch (error) {
    next(error);
  }
};

function totalPrice(price, days) {
  let total = price * days.length;
  return total;
}

module.exports = updateCartDetail;
