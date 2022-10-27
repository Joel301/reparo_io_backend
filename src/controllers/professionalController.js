const { Professional, Profession } = require("../db.js");
const { Op } = require("sequelize");

const isUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getAllProfesional = async (req,res,next) => {
  try{
    const results = await Professional.findAll({ include: Profession });
  if(!results) res.json("no professionals found");
  else
    res.json(results.map((p) => {         //esto es para solo retornar la profesion en array y excluir el Prof_Prof
      if (p.professions.length) {
        return {
          ...p.dataValues, professions: p.dataValues.professions.map(profemap => {
            const { id, name } = profemap.dataValues
            return { id, name }
          })
        }
      } else { return p.dataValues }
    }))
  }
  catch(error) {
    error.message="error at getting all professionals";
    next(error);
  }
};

const getProfessioanlById = async (req,res,next) => {
  const {id} =req.params;
  try {
    if (!isUUID.test(id)) throw new Error("Invalid UUID Format"); //revisa que sea un uuid para evitar sequelize error
    const profesionalId = await Professional.findOne({
      where: { id: id },
      include: [{ model: Profession, attributes: ["id", "name"] }],
    });

    if (!profesionalId) res.json("not Found");
    else{
      let profes = profesionalId.professions ? profesionalId.professions : [];

      const prof = {
        id: profesionalId.id,
        firstName: profesionalId.firstName,
        lastName: profesionalId.lastName,
        profileImg: profesionalId.profileImg,
        phoneNumber: profesionalId.phoneNumber,
        address: profesionalId.address,
        email: profesionalId.email,
        reputation: profesionalId.reputation
          ? profesionalId.reputation
          : "not available yet",
        professions: profes,
      };
      res.json(prof);
      }
  } catch (e) {
    next(e);
  }
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
    if(!data) throw new Error (`INPUT_ERROR: email cannot be empty`)
    if (data.trim() === "")
    throw new Error(`INPUT_ERROR: ${element} cannot be empty`);
    if (!data.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) throw new Error(`${data} is not an email`)
  }


const postProfesionalFunction = async (data) => {
  const { firstName, lastName, address, professions, email } = data;
  try {
    isStringOk([firstName, lastName, address])
    isEmail(email)
    isArrayOk(professions)
    const newProfessional = await Professional.create(req.body);
    await Promise.all(
      req.body.professions.map(async (p) => {
        let profesion = {};
        // esto es para tomar ambos sean objetos o id de profesion
        isNaN(p)
          ? (profesion = await Profession.findOne({
            where: { name: `${p}` },
          }))
          : (profesion = await Profession.findByPk(p));

        newProfessional.addProfession(profesion);
      }))
    return newProfessional;
  }catch(error){
    console.log(error)
    return error
  }
}

const postAProfesional = async (req,res,next) => {
    // const {firstName, lastName, address, professions, email} = req.body;
    const data = req.body
    try {
        const newProfessional = postProfesionalFunction(data);
        res.json({newProfessional,message:"profesional creado"});
    } catch (e) {
      e.message = "error creando profesional";
      next(e);
    }
};

const putProfesional = async (req,res,next) =>{
  const { id } = req.params;
  const { body } = req;
  try {
    let updateProfesional= await Professional.findOne({
        where:{
            id: id,
        },
        include:{
            model: Profession,
            attributes: ['name'],
            through: {
                attributes:[]
            }}
    });
    await updateProfesional.update({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        address: body.address,
        aboutMe: body.aboutMe,
        profileImg: body.profileImg
    });
    let profDb= await Profession.findAll({
        where:{
            name:{
                [Op.in]: body.professions,
            },
        },
    });
    await updateProfesional.setProfessions(profDb);
    res.json({updateProfesional,message:"profesional actualizado"});
} catch (error) {
    next(error);
}    
}
const delProfesional = async  (req,res,next) =>{
  const { id } = req.params;
  try {
    const profDelete= await Professional.findByPk(id,{
        include:{
            model: Profession,
            attributes: ['name'],
            through: {
                attributes:[]
            }}
    })
    if(profDelete){
        await profDelete.destroy();
      res.json({profDelete,message:'..Professional deleted!'});
    }
    else
        res.send({message: 'professional not found'});
   } catch (error) {
       next(error);
   }
}

module.exports = {
  getAllProfesional,
  postAProfesional,
  postProfesionalFunction,
  putProfesional,
  delProfesional,
  getProfessioanlById,
};
