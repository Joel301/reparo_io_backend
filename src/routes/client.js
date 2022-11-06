
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
router.delete("/:id", delClientController)
router.put("/:id", updateClientController)
router.post("/", postClientController)
   
module.exports = router;
  
