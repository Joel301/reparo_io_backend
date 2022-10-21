const {Client} = require("../db")

//Validaciones -- Se podrian mover a un archivo aparte
function isStringOk(data) {

    data.forEach(element => {
  
      if (typeof element !== "string")
        throw new Error(`INPUT_ERROR: ${element} is not a String`);
      if (element.trim() === "")
        throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
  
    })
  
  }
  
  function isArrayOk(data) {
    if (typeof data !== "object")
      throw new Error(`INPUT_ERROR: ${data} is not an Array`);
  
  }
  
  function isEmail(data) {
    if (!data) throw new Error(`INPUT_ERROR: email cannot be empty`)
    if (data.trim() === "")
      throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
    if (!data.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) throw new Error(`${data} is not an email`)
  }

  const postClientController = async (req,res,next) => {
    const { firstName, lastName, address, email } = req.body
  
  
    try {
      isStringOk([firstName, lastName, address])
      isEmail(email)
      
      const newClient = await Client.create(req.body);
        

      res.json(newClient);
  
    } catch (e) {
        
        e.message="error at creating client"
      next(e)
    }
  
  };

  module.exports= postClientController