const { Client, Cart, Order, OrderDetail } = require("../db");
const { isStringOk, isEmail } = require("../services/validaciones");
const postOrderController = require("./postOrderController");

//Validaciones -- Se podrian mover a un archivo aparte

const postClientController = async (req, res, next) => {
  const { firstName, lastName, address, email} = req.body;

  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);

    const newClient = await Client.create(req.body);

    //Creando carrito a nuevo usuario
    await Cart.create({
      clientId: newClient.id,
      amount: "",
    });

    return res.json({ newClient, message: "user created" });
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
      include: [
        { model: Cart, attributes: ["id"] },
        {
          model: Order,
          include: {
            model: OrderDetail,
            exclude: { attributes: ["clientId"] },
          },
        },
      ],
    });

    if (!client) res.json("Not found");
    else res.json(client);
  } catch (error) {
    next(error);
  }
};
const delClientController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clientDelete = await Client.findByPk(id);
    if (clientDelete) {
      clientDelete.update({...clientDelete, enabled:false});
      res.json({ clientDelete, message: "..Client deleted!" });
    } else res.send({ message: "client not found" });
  } catch (error) {
    next(error);
  }
};
const updateClientController = async (req, res,next) =>{
  const {id} = req.params;
  const { firstName, lastName, address, email } = req.body;

  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);
    const updClient = await Client.findByPk(id);
    updClient.update(req.body);

    return res.json({ updClient, message: "user updated" });
  } catch (e) {
    next(e);
  }
}
module.exports = {
  getClientController,
  getClientsController,
  postClientController,
  delClientController,
  updateClientController,
};
