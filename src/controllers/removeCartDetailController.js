const { CartDetail } = require("../db");

const removeCartDetailController = async function (req, res, next) {
  let cartDetailId = req.params.id;
  try {
    const cartDetail = await CartDetail.findByPk(cartDetailId);
    if (!cartDetail) {
      throw new Error('uuid no encontrado Carrito Erroneo')
    }
    const cart = await cartDetail.getCart();
    const details = await cart.getCartDetails();
    const totalAmount = details.map((aCart) => aCart.reservationAmount).reduce((a, b) => a + b)
    let price = cartDetail.reservationAmount;
    let newAmount = totalAmount - price;

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
