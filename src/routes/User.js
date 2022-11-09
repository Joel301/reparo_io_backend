const { Router } = require("express");
const { getUserById, getUserByEmail } = require("../controllers/GetUser");
const PostUser = require("../controllers/PostUser");
const router = Router();
const jwt = require("jsonwebtoken");

const TOKEN_KEY = "escualquiera";

const isAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  if (userId) return res.send("Is Logged");
  next();
};
const isNotAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  if (!userId) return res.send("Is Not Logged");
  next();
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  if (token == null) return res.status(401).send("token requerido");
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("token invalido");
    console.log(user);
    req.user = user;
    next();
  });
};
router.get("/", (req, res, next) => {
  let id;
  let email;
  req.query.id ? (id = req.query.id) : null; //si viene id
  req.query.email ? (email = req.query.email) : null; //si viene email
  try {
    if (id) {
      getUserById(id).then((user) => {
        res.send(user);
      });
    } else if (email) {
      getUserByEmail(email).then((user) => {
        res.send(user);
      });
    } else {
      res.send("la pifiaste con la consulta");
    }
  } catch (error) {
    next(error);
  }
});
router.post("/login", isAuthenticated, async (req, res, next) => {

let data = null;

  const { email, password , google} = req.body;console.log(req.body);
  let msg ="";
try {
  if (email) {
    const user = await getUserByEmail(email);
      if (user.isClient) {
        msg=msg+"cliente";
        if (google) {msg=msg+" google"; data = user.isClient;}
        else{
          if(user.isClient.password === password)
            {msg=msg+" contraseña correcta"; data = user.isClient;}
          else {msg=msg+" error de contraseña"}
        }
      }
      if (user.isProfessional) {
        msg=msg+"profesional";
        if(google) {msg=msg+" google"; data = user.isProfessional;}
        if (user.isProfessional.password === password) {
          msg=msg+" contraseña correcta"; data = user.isProfessional;
        }
        else {msg=msg+" error de contraseña"}
      }
      if (user.isAdmin) {
        msg=msg+"administrador";
        if(google){msg=msg+" google";data = user.isAdmin;}
        if (user.isProfessional.password === password) {
          msg=msg+" contraseña correcta"; data = user.isAdmin;
        }
        else {msg=msg+" error de contraseña"}
      }
      if (data) {
        const token = jwt.sign({ id: data.id, email: data.email }, TOKEN_KEY, {
          expiresIn: "2h",
        });
        console.log(data.id);
        res.cookie("userId", data.id);
        data = { ...data, token,msg };
        // res.redirect('/home/login');
        return res.status(200).json(data);
      } else {msg="No existe en DB";
        return res.status(400).json(msg);
      }
    } else {
      return res.status(401).json("Login Error");
    }
} catch (error) {
    next(error);
  }
});
router.get("/login", (req, res, next) => {
  const { userId } = req.cookies;
  console.log(userId);
  if (userId) {
    getUserById(userId).then((user) => {
      res.send(user);
    });
  } else res.send("NO LOGIN");
});
router.post("/logout", isNotAuthenticated, (req, res) => {
  res.clearCookie("userId");
  return res.send("Logout");
});
router.post("/register", isAuthenticated, (req, res, next) => {
  const { body } = req;
  PostUser(body).then((r) => {
    console.log(r);
    res.send(r);
  });
});

module.exports = router;
