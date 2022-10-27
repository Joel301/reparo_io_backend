const { Professional, Profession } = require("../db");

const getAllProfessionalService = async function () {
  return Professional.findAll({ include: Profession });
};

module.exports = getAllProfessionalService;
