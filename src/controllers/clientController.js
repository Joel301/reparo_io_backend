const { Client } = require("../db");

//Validaciones -- Se podrian mover a un archivo aparte
function isStringOk(data) {
  data.forEach((element) => {
    if (typeof element !== "string")
      throw new Error(`INPUT_ERROR: ${element} is not a String`);
    if (element.trim() === "")
      throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
  });
}

function isArrayOk(data) {
  if (typeof data !== "object")
    throw new Error(`INPUT_ERROR: ${data} is not an Array`);
}

function isEmail(data) {
  if (!data) throw new Error(`INPUT_ERROR: email cannot be empty`);
  if (data.trim() === "")
    throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
  if (
    !data.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw new Error(`${data} is not an email`);
}

const postClientController = async (req, res, next) => {
  const { firstName, lastName, address, email } = req.body;

  try {
    isStringOk([firstName, lastName, address]);
    isEmail(email);

    const newClient = await Client.create(req.body);
    res.json({ newClient, message: "usuario creado" });
  } catch (e) {
    e.message = "error creando cliente";
    next(e);
  }
};
const getClientsController = async function (req,res,next) {

  try {

      const results = await Client.findAll()
      
      if (!results) res.json("no client found")
      else res.json(results)
      
  } catch (error) {
      error.message="error at getting all clients"
      next(error)
      
  }
  
}
const getClientController= async function (req,res,next) {
  const {id}=req.params
  try {
      const client = await Client.findOne(
          {where: {id:id}}
      )

      if (!client) res.json("Not found")
      else res.json(client)

  } catch (error) {
      next(error);
  }
 
}
module.exports = {
getClientController,
getClientsController,
postClientController
};
