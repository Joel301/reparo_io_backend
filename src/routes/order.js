const { Router } = require("express");
const getOrderIdController = require("../controllers/getOrderIdController");
const postOrderDetails = require("../controllers/postOderDetails");
const router = Router();
const postOrderController = require("../controllers/postOrderController");
const removeOrderController = require("../controllers/removeOrderController");
const removeOrderDetailController = require("../controllers/removeOrderDetailController");
const getOrdersController = require("../controllers/getOrdersControllers");
const updateOrderStatusController = require("../controllers/updateOrderStatusController");
const getOrdersProfController = require("../controllers/getOrdersProfController");

router.post("/", postOrderController);
router.post("/test", postOrderDetails);
router.get("/:id", getOrderIdController);
router.get("/", getOrdersController);
router.get("/professional/:id", getOrdersProfController);
router.patch("/:id", updateOrderStatusController);
router.delete("/:id", removeOrderController);
router.delete("/order/:id", removeOrderDetailController);

module.exports = router;
