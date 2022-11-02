const { Router } = require("express");
const getCartController = require("../controllers/getCartController");
const postCartDetail = require("../controllers/postCartDetail");
const removeCartDetailController = require("../controllers/removeCartDetailController");
const updateCartDetail = require("../controllers/updateCartDetailController");
const router = Router();

router.post("/", postCartDetail);
router.patch("/:id", updateCartDetail);
router.delete("/:id", removeCartDetailController);
router.get("/", getCartController);

module.exports = router;
