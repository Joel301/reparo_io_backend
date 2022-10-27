const { Professional, Profession } = require("../db");

const postProfessionalService = async function (body) {
  try {
    const newProfessional = await Professional.create(body);
    await Promise.all(
      body.professions.map(async (p) => {
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

    return newProfessional;
  } catch (error) {
    throw error;
  }
};

module.exports = postProfessionalService;
