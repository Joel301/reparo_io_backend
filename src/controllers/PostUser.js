// const { Professional, Profession } = require("../db.js");
const { User, Professional } = require("../db.js");
const { postAProfesional } = require("./professional");

async function PostUser(userdata) {
    try {
        const { email, authid, isProfessional, ...data } = userdata
        const newUsuario = await User.create({ email, uid: authid })
        const newProfessional = await postAProfesional({ ...data, email })
        await newUsuario.setProfessional(newProfessional)
        return newUsuario
    } catch (error) {
        console.log(error)
    }

}

module.exports = PostUser