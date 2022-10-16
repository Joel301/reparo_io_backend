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
router.post("/", async (req, res, next) => {
    const { body } = req;
    console.log(body, "aqui");
    try{
        await postAProfesional(body)
        res.send({message:"agregado"})
    } catch(e){
        next(e)
    }
    
});

module.exports = router;
