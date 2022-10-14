const { Professional } = require("../db.js");

const getAllProfesional = async () => {
    const results = await Professional.findAll();
    return results;
};

const postAProfesional = async (profesionalData) => {
    if (!profesionalData.name) {
        return { error: "Profesional must have at least a name" };
    }
    try {
        const newProfessional = await Professional.create(profesionalData);
        return newProfessional.dataValues;
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    getAllProfesional,
    postAProfesional,
};
