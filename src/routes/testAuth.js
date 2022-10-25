const { Router } = require('express')
const getUserById = require('../controllers/GetUser')
const PostUser = require('../controllers/PostUser')
const postUser = require('../controllers/PostUser')
const router = Router()


router.get("/", (req, res, next) => {
    // res.send('i work on test')
    const { id } = req.query;
    console.log(id)
    if (id) {
        getUserById(id).then((user) => res.send(user))
    }
    else {
        res.send('thisisatestroute')
    }

})

router.post("/", (req, res, next) => {
    const { body } = req
    // console.log(body, "estodeberia ser un body")
    // res.send({ ...body })
    PostUser(body).then(r => { console.log(r); res.send(r) })
})

module.exports = router