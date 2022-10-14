const { Router } = require("express");
const {
    getAllProfesional,
    postAProfesional,
} = require("../controllers/professional");
const router = Router();

router.get("/", (req, res, next) => {
    console.log("imhere");
    getAllProfesional().then((r) => res.send(r));
});
router.post("/", (req, res, next) => {
    const { body } = req;
    console.log(body, "aqui");
    postAProfesional(body).then((r) => console.log(r));
    res.send(body);
});

module.exports = router;
