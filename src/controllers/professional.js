const { Professional, Profession } = require("../db.js");
const { Op } = require("sequelize");

const isUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getAllProfesional = async () => {
  const results = await Professional.findAll({ include: Profession });
  return results.map((p) => {         //esto es para solo retornar la profesion en array y excluir el Prof_Prof
    if (p.professions.length) {
      console.log(p)
      return {
        ...p.dataValues, professions: p.dataValues.professions.map(profemap => {
          const { id, name } = profemap.dataValues
          return { id, name }
        })
      }
    } else { return p }
  })

  //return results;
};

const infoById = async (id) => {
  try {
    if (!isUUID.test(id)) throw new Error("Invalid UUID Format"); //revisa que sea un uuid para evitar sequelize error
    const profesionalId = await Professional.findOne({
      where: { id: id },
      include: [{ model: Profession, attributes: ["id", "name"] }],
    });

    if (!profesionalId) throw new Error("not Found");

    let profes = profesionalId.professions ? profesionalId.professions : [];

    const prof = {
      id: profesionalId.id,
      firstName: profesionalId.firstName,
      lastName: profesionalId.lastName,
      profileImg: profesionalId.profileImg,
      reputation: profesionalId.reputation
        ? profesionalId.reputation
        : "not available yet",
      professions: profes,
    };
    return prof;
  } catch (e) {
    e.status = 404;
    throw e;
  }
};

function isStringOk(data) {
  if (typeof data !== "string")
    throw new Error(`INPUT_ERROR: ${data} is not a String`);
  if (data.trim() === "")
    throw new Error(`INPUT_ERROR: ${data} cannot be empty`);
}

function isArrayOk(data) {
  if (typeof data !== "object")
    throw new Error(`INPUT_ERROR: ${data} is not an Array`);
  //Se aceptan instrucciones vacias
}

const postAProfesional = async (profesionalData) => {
  if (!profesionalData.firstName) {
    return { error: "Profesional must have at least a name" };
  }
  try {
    const newProfessional = await Professional.create(profesionalData);

    await Promise.all(
      profesionalData.professions.map(async (p) => {
        let profesion = {};
        // esto es para tomar ambos sean objetos o id de profesion
        isNaN(p)
          ? (profesion = await Profession.findOne({
            where: { name: `${p}` },
          }))
          : (profesion = await Profession.findByPk(p));

        newProfessional.addProfession(profesion);
      })
    );

    return newProfessional.dataValues;
  } catch (e) {
    return { error: e };
  }
};

const putProfesional = async (profesionalData, id) =>{
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
        firstName: profesionalData.firstName,
        lastName: profesionalData.lastName,
        phoneNumber: profesionalData.phoneNumber,
        address: profesionalData.address,
        aboutMe: profesionalData.aboutMe,
        profileImg: profesionalData.profileImg
    });
    let profDb= await Profession.findAll({
        where:{
            name:{
                [Op.in]: profesionalData.professions,
            },
        },
    });
    await updateProfesional.setProfessions(profDb);
    return updateProfesional;
} catch (error) {
    console.log(error);
}    
}
const delProfesional = async (id) => {
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
        return res.send('..Professional deleted!');
    }
    else
        return res.send({message: 'not found'});
   } catch (error) {
       console.log(error);
   }
  
}

module.exports = {
  getAllProfesional,
  postAProfesional,
  putProfesional,
  delProfesional,
  infoById,
};
