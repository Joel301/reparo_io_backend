const { Router } = require("express");
const { searchController } = require("../controllers/searchController");

const professionsRoute = require("./professions");
const profesionalRoute = require("./profesional");
const User = require("./User");
const reviewsRoute = require("./reviews");
const clientRoute = require("./client");
const paymentRoute = require("./payment");
const orderRoute = require("./order");
const cartRoute = require("./cart");
const { route } = require("./professions");

const mercadoPago = require('./mercadoPago');

const router = Router();

router.use("/professionals", profesionalRoute);
router.use("/professions", professionsRoute);
router.use("/user", User);
router.use("/reviews", reviewsRoute);
router.use("/clients", clientRoute);
router.use("/orders", orderRoute);

router.use("/payments", paymentRoute);

router.use("/cart", cartRoute);

router.get("/", searchController);

router.use("/mercado", mercadoPago);



router.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = router;
