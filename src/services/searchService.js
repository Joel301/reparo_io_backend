const { Professional, Profession } = require("../db");
const { Op } = require("sequelize");
const { data } = require("./dummyData");

const searchService = async function (search) {
  try {
    const profsDB = await Professional.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${search.toLowerCase()}%`,
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${search.toLowerCase()}%`,
            },
          },
        ],
      },
      include: Profession,
    });

    //Logica hacer la busqueda en la DummyData. Comentar cuandono se necesite
    //const profsDB = data.filter((element)=>{
    //   if (element.name.includes(search.toLowerCase())) return element
    //})

    if (profsDB.length < 1) {
      return ["No professional found"];
    }

    //Aplicando formato a la data
    const searchedProfsDB = [];
    profsDB.forEach((element) => {
      searchedProfsDB.push({
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
        reputation: element.reputation
          ? element.reputation
          : "not available yet",
        profileImg: element.profileImg
          ? element.profileImg
          : "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
          professions: element.professions
        // professions: element.professions.map((element) => {
        //   return element.name;
        // }),
      });
    });

    return searchedProfsDB;
  } catch (e) {
    e.message = "error at searching at database";
  }
};

module.exports = {
  searchService,
};
