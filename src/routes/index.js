const { Router } = require("express");
const { searchController } = require("../controllers/searchController");

const professionsRoute = require("./professions");
const profesionalRoute = require("./profesional");
const clientRoute = require("./client");
const orderRoute = require("./order");
const { route } = require("./professions");

const router = Router();

router.use("/professionals", profesionalRoute);
router.use("/professions", professionsRoute);
router.use("/clients", clientRoute);
router.use("/orders", orderRoute);
router.get("/", searchController);

router.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = router;
