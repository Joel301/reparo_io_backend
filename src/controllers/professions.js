const { Professional, Profession } = require('../db.js');

const infoProfessions = async () => {
  try{
    const profs = await Profession.findAll({
      include: [
        {
          model: Professional,
          //attributes: ["id"],
        },
      ],
    });
    return profs;
  }
  catch (error){
    res.status(500).send({ msg: "Error info professions (findAll)", error })
  }
};

const postProfessions = async (data) => {
  const { name } = data;
  try{
    const { length } = await infoProfessions()
    if (!name) return { error: "es necesario el nombre del profesional" }
    const [newProfessional, isnew] = await Profession.findOrCreate({
      where: { name }, defaults: {
        id: length + 1
      }
    });
    console.log(isnew)
    return { newProfessional, isnew }
  }
  catch(error){
    res.status(500).send({ msg: "Error post professions", error })
  }
}
module.exports = {
  infoProfessions,
  postProfessions
};
