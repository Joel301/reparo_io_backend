const { Professional, Profession } = require("../db.js");

const getAllProfesional = async () => {
    const results = await Professional.findAll({
        include: Profession
    });
    return results;
};


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
    if (!data.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) throw new Error(`${data} is not an email`)
  }

const postAProfesional = async (profesionalData) => {
    const {firstName, lastName, address, professions, email} = profesionalData

    try {
        isStringOk([firstName, lastName, address])
        isEmail(email)
        isArrayOk(professions)


        const newProfessional = await Professional.create(profesionalData);

        await Promise.all(
            profesionalData.professions.map(async (p) => {
                let profesion = {};
                // esto es para tomar ambos sean objetos o id de profesion
                isNaN(p)
                    ? (profesion = await Profession.findOne({
                          where: { name: `${p}`},
                      }))
                    : (profesion = await Profession.findByPk(p));
   
                newProfessional.addProfession(profesion);
            }))

        return newProfessional.dataValues;
        
    } catch (e) {
        throw e
    } 
        


};

module.exports = {
    getAllProfesional,
    postAProfesional,
};
