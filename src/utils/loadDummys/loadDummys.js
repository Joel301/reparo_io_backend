const { getAllProfesional, postAProfesional } = require('../../controllers/professional');
const getAProfessionalDummy = require('./getAProfessionalDummy');

function loadDummys(minUser = 107) {
    getAllProfesional()
        .then(r => {
            var dummys = []
            for (var i = 0; i < minUser - r.length; i++) { //busca completar la cantidad de dumis min
                dummys.push(postAProfesional(getAProfessionalDummy()))
            }
            return dummys
        }
        ).then(() => { console.log('dummiesLoaded') })
        .catch(e => console.log(e));
}
module.exports = loadDummys;