const {Order, Cart, Professional} = require('../../db.js');

const orderStatus = async (data) => {
    
    try {
        const { ordersIds, purchaseId } = data;

        const newCart = await Cart.findOne({where: {payment_id: purchaseId}});
        let fullPrice = 0;
        for (const order of ordersIds) {
        const foundOrder = await Order.findByPk(order);
            if(foundOrder){
            const foundProfessional = await Professional.findOne({where: {id: foundOrder.productId}});
            fullPrice = fullPrice + foundOrder.amount * foundProfessional.price;
            foundOrder.status = "finished";
            foundOrder.purchaseId = purchaseId
            foundOrder.save();
            newCart.addOrder(foundOrder);
            }
        }
        newCart.fullPrice = fullPrice
        newCart.save()
    return newCart;
} catch (error) {
    console.log(error)
    return false;
}
}

module.exports = orderStatus;