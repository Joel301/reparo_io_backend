const { CartDetail } = require("../db");

const removeCartDetailController = async function (req, res, next) {
  let cartDetailId = req.params.id;
  try {
    const cartDetail = await CartDetail.findOne({
      where: { id: cartDetailId },
    });

    const cart = await cartDetail.getCart();

    let price = cartDetail.reservationAmount;
    let newAmount = cart.amount - price;

    await cart.update({ amount: newAmount });

    await cartDetail.destroy();

    res.json({
      message: `Borrado cartDetail id: ${cartDetailId}`,
      cartAmount: newAmount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeCartDetailController;
