const { Professional, Profession } = require('../db.js');

const infoProfessions = async () => {
  const profs = await Profession.findAll({
    include: [
      {
        model: Professional,
        //attributes: ["id"],
      },
    ],
  });
  return profs;
};

const postProfessions = async (data) => {
  const { name } = data
  const { length } = await infoProfessions()
  console.log(length)
  if (!name) return { error: "es necesario el nombre del profesional" }
  const [newProfessional, isnew] = await Profession.findOrCreate({
    where: { name }, defaults: {
      id: length + 1
    }
  });
  console.log(isnew)
  return { newProfessional, isnew }
}

module.exports = {
  infoProfessions,
  postProfessions
};
