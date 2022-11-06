const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routes = require("./routes");

const server = express();
server.name = "API_reparo_io";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Origin", /.*.vercel.app*./); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

server.use("/home", routes); //HOME NO ES UN NOMBRE APROPIADO, API ES EL CORRECTO PARA BACKENDS. NO BORRAR ESTO O ROMPERAR EL FRONT
server.use("/api", routes); //NO BORRAR ESTA LINEA, NO AFECTA EL CODIGO DE NINGUNA MANERA Y ROMPERA COSAS EN EL FRONT

server.use("/", (req, res) => {
  res.send("itworked ON DEVELOP");
});
server.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
