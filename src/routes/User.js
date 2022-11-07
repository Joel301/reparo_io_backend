const { Router } = require('express')
const getUserById = require('../controllers/GetUser')
const PostUser = require('../controllers/PostUser')
const router = Router()


router.get("/", (req, res, next) => {
    const { id } = req.query;
    if (id) {
        getUserById(id).then((user) => {
            
            res.send(user)
        })
    }
    else {
        res.send('thisisatestroute')
    }

})

router.post("/", (req, res, next) => {
    const { body } = req
    PostUser(body).then(r => { console.log(r); res.send(r) })
})

module.exports = router
