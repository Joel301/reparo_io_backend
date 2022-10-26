
const { Router } = require("express");
const router = Router();
const { getClientsController, 
        getClientController, 
        postClientController}
        =require("../controllers/clientController")

router.get("/", getClientsController)
router.get("/:id", getClientController)
router.post("/", postClientController)
   
module.exports = router;
  
