const { Router } = require("express");
const postCartDetail = require("../controllers/postCartDetail");
const updateCartDetail = require("../controllers/updateCartDetailController");
const router = Router();

router.post("/", postCartDetail);
router.patch("/:id", updateCartDetail);

module.exports = router;
