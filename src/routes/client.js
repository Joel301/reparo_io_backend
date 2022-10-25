
const { Router } = require("express");
const router = Router()
const getClientsController = require("../controllers/getClientsController")
const getClientController = require("../controllers/getClientController")
const postClientController=require("../controllers/postClientController")


router.get("/", getClientsController)
router.get("/:id", getClientController)
router.post("/", postClientController)
   
module.exports = router;
  
