const {preloadProfs} =require("../utils/preLoadProfs")
const { Professional, Profession } = require('../db.js');

const infoProfessions = async ()=>{
  preloadProfs();
  const profs = await Profession.findAll({
    include: [{
        model: Professional,       
        attributes: ['id']
    }]
});
return profs;
}

module.exports={
    infoProfessions,
}
