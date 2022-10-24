const { Router } = require("express");
const router = Router();
const postOrderController = require("../controllers/postOrderController");

router.post("/", postOrderController);

module.exports = router;
