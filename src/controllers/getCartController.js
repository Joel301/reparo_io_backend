const { Cart, CartDetail } = require("../db");

const getCartController = async function (req, res, next) {
  let clientId = req.params.id;

  try {
    const cart = await Cart.findOne({
      where: { clientId: clientId },
      include: {
        model: CartDetail,
        attributes: { exclude: ["updatedAt"] },
      },
    });

    //Aplicando formato
    res.json({
      clientId: cart.clientId,
      cartAmount: cart.amount,
      items: cart.cartDetails,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCartController;
