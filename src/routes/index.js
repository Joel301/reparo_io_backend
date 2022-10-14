const {Router} = require("express")
const {searchController} = require("../controllers/searchController")


const router = Router()

router.get("/", searchController)


router.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = router;
//Aqui estoy