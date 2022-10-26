const { Client } = require("../db");
const { isStringOk, isEmail } = require("../services/validaciones");

//Validaciones -- Se podrian mover a un archivo aparte


const postClientController = async (req, res, next) => {
  const { firstName, lastName, address, email } = req.body;

  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);

    const newClient = await Client.create(req.body);

    res.json({ message: "usuario creado" });
  } catch (e) {
    e.message = "error at creating client";
    next(e);
  }
};

module.exports = postClientController;
