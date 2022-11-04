
const { Router } = require("express");
const router = Router();
const { getClientsController, 
        getClientController, 
        postClientController,
        delClientController,
        updateClientController,}
        =require("../controllers/clientController")

router.get("/", getClientsController)
router.get("/:id", getClientController)
router.put("/delete/:id", delClientController)
router.put("/update/:id", updateClientController)
router.post("/", postClientController)
   
module.exports = router;
  
