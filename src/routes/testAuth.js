const { Router } = require('express')
const router = Router()


router.get("/", (req, res, next) => {
    res.send('i work on test')
})

router.post("/", (req, res, next) => {
    const { body } = req
    console.log(body, "estodeberia ser un body")
    res.send({ ...body })
})

module.exports = router