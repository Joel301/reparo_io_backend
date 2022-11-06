
const { Router } = require("express");
const router = Router();
const { getPayments}
        =require("../controllers/paymentController")

router.get("/", getPayments);
   
module.exports = router;
  
