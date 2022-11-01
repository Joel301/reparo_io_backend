const { Client, Cart } = require("../db");
const { isStringOk, isEmail } = require("../services/validaciones");

//Validaciones -- Se podrian mover a un archivo aparte

const postClientController = async (req, res, next) => {
  const { firstName, lastName, address, email } = req.body;

  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);

    const newClient = await Client.create(req.body);

    //Creando carrito a nuevo usuario
    await Cart.create({
      clientId: newClient.id,
    });

    res.json({ newClient, message: "usuario creado" });
  } catch (e) {
    next(e);
  }
};
const getClientsController = async function (req, res, next) {
  try {
    const results = await Client.findAll();

    if (!results) res.json("no client found");
    else res.json(results);
  } catch (error) {
    error.message = "error at getting all clients";
    next(error);
  }
};
const getClientController = async function (req, res, next) {
  const { id } = req.params;
  try {
    const client = await Client.findOne({
      where: { id: id },
      include: { model: Cart, attributes: ["id"] },
    });

    if (!client) res.json("Not found");
    else res.json(client);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getClientController,
  getClientsController,
  postClientController,
};
