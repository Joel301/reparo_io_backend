const Router = require('express');
const { createOrder, handleStatus } = require('../controllers/mercadoPagoController');
const orderStatus = require('../controllers/orderStatusControllers');

const router = Router();

router.post("/", createOrder);
router.get('/status', handleStatus);

router.post("/notificar", (req,res) =>{
    console.log("notificar PAGO")
    res.send("notificar");
});

router.put("/", async function (req, res) {
    try {
        const data = req.body;
        const changedOrder= await orderStatus(data);
        if(changedOrder){
        return res.send(changedOrder)
        }
    return res.send({ error: "I couldn't change the order" });
    } catch (err) {
        console.log(err);
    }
    });

module.exports = router;