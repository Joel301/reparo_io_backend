const Router = require('express');
const { createOrder, handleSuccess, handlePending } = require('../controllers/mercadoPagoController');
const orderStatus = require('../controllers/orderStatusControllers');

const router = Router();

router.post("/", createOrder);
router.get('/success', handleSuccess);
router.get('/pending', handlePending);

router.post("/notificar", (req,res) =>{
    const {action} = req.body;

    console.log(req.body);
    if(action)
    console.log(action);
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