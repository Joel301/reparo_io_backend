const { Professional, Profession } = require("../db.js");

const getAllProfesional = async () => {
    const results = await Professional.findAll();
    return results;
};

const infoById = async (id) => {
    const profesionalId = await Professional.findOne({
        where : { id: id },
        include: [{model: Profession,
        attributes: ["id","name"]}],
    })
    let {Professions} = profesionalId;
    let profes = Professions ?
    Professions.map((p) => p.name) : [];

    const prof = {
        id: profesionalId.id,
        name: profesionalId.name,
        profileImg: profesionalId.profileImg,
        reputation: profesionalId.reputation,
        professions: profes,
    }
    return prof
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
                          where: { name: `${p}`},
                      }))
                    : (profesion = await Profession.findByPk(p));
   
                newProfessional.addProfession(profesion);
            }))

        return newProfessional.dataValues;
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    getAllProfesional,
    postAProfesional,
    infoById,
};
