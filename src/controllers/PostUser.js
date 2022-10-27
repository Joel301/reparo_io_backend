const { User } = require("../db.js");
const postClient = require("./postClient.js");
const { postProfesionalFunction } = require("./professionalController.js");

// const { postAProfesional } = require("./professional");

async function PostUser(userdata) {
    try {
        const { email, authid, isProfessional, isClient, ...data } = userdata
        const newUsuario = await User.create({ email, uid: authid })
        if (isProfessional) {
            const newProfessional = await postProfesionalFunction({ ...data, email })
            await newUsuario.setProfessional(newProfessional)
        }
        if (isClient) {
            const newClient = await postClient({ ...data, email })
            await newUsuario.setClient(newClient)
        }
        return newUsuario
    } catch (error) {
        console.log(error)
    }
}

module.exports = PostUser
