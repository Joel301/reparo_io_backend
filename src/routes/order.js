const { Router } = require("express");
const postOrderDetails = require("../controllers/postOderDetails");
const router = Router();
const postOrderController = require("../controllers/postOrderController");

router.post("/", postOrderController);
router.post("/test", postOrderDetails);

module.exports = router;
