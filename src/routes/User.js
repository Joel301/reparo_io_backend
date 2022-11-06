const { Router } = require('express')
const { getUserById, getUserByEmail } = require('../controllers/GetUser')
const PostUser = require('../controllers/PostUser')
const router = Router()


router.get("/", (req, res, next) => {
    let id;let email;
    req.query.id?id=req.query.id:null;//si viene id
    req.query.email?email=req.query.email:null;//si viene email

    if (id) { getUserById(id).then((user) => { res.send(user) })}
    else if (email) {getUserByEmail(email).then((user) => {res.send(user)})}
    else { res.send('la pifiaste con la consulta') }
})

router.post("/", (req, res, next) => {
    const { body } = req
    PostUser(body).then(r => { console.log(r); res.send(r) })
})

module.exports = router
