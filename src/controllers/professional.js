const { signedCookie } = require("cookie-parser");
const { Professional, Profession } = require("../db.js");

const getAllProfesional = async () => {
    const results = await Professional.findAll({
        include: [{ model: Profession, exclude: ["Prof_Prof"] }],
    });
    return results;
};

const postAProfesional = async (profesionalData) => {
    const { professions, ...profesionalInfo } = profesionalData;
    if (!profesionalData.name) {
        return { error: "Profesional must have at least a name" };
    }
    try {
        const newProfessional = await Professional.create(profesionalInfo);
        await Promise.all(
            professions.map(async (p) => {
                let profesion = {};
                // esto es para tomar ambos sean objetos o id de profesion
                isNaN(p)
                    ? (profesion = await Profession.findOne({
                          where: { name: p.id },
                      }))
                    : (profesion = await Profession.findByPk(p));
                newProfessional.addProfession(profesion);
            })
        );
        //para poder jalar las profesions se 
        return newProfessional.dataValues;
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    getAllProfesional,
    postAProfesional,
};
