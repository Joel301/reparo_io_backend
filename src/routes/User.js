const { Router } = require('express')
const {getUserById} = require('../controllers/GetUser')
const PostUser = require('../controllers/PostUser')
const router = Router()


router.get("/", (req, res, next) => {

  // let id;
  // let email;
  const { id} = req.query
  // req.query.id ? (id = req.query.id) : null; //si viene id
  // req.query.email ? (email = req.query.email) : null; //si viene email

  getUserById(id).then((user) => {
    res.send(user);
  }).catch(error => console.log(error));
  // if (id) {
  // } else if (email) {
  //   getUserByEmail(email).then((user) => {
  //     res.send(user);
  //   });
  // } else {
  //   res.send("la pifiaste con la consulta");
  // }
});
router.post("/login", isAuthenticated, async (req, res, next) => {
  let data = null;
  const { email, password } = req.body;


})

router.post("/", (req, res, next) => {
    const { body } = req
    PostUser(body).then(r => { console.log(r); res.send(r) })
})

module.exports = router
