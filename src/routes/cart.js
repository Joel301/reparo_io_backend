const { Router } = require("express");
const postCartDetail = require("../controllers/postCartDetail");
const removeCartDetailController = require("../controllers/removeCartDetailController");
const updateCartDetail = require("../controllers/updateCartDetailController");
const router = Router();

router.post("/", postCartDetail);
router.patch("/:id", updateCartDetail);
router.delete("/:id", removeCartDetailController);

module.exports = router;
