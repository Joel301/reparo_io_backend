const { User, Professional, Admin, Client } = require("../db.js");
let isUUID =
    /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/gi;
async function getUserById(id) {
    console.log(id);
    if (id.search(isUUID) != 0) {
        res.status(400).send({ msg: `uuid de usuario invalido: ${id}` })
        return
    }
    try {
        const isClient =       await Client.findByPk(id); 
        if (isClient)       return {isClient, msg:"is Client"}
        const isProfessional = await Professional.findByPk(id);
        if (isProfessional) return {isProfessional, msg:"is Professional"};
        const isAdmin =        await Admin.findByPk(id);
        if (isAdmin)        return {isAdmin, msg:"is Admin"};
        return { error: "not found" };
    } catch (error) {
        console.log(error)
    }
}
async function getUserByEmail(email) {
    const where = {where : {email:email}}
    try {
        const isClient =       await Client.findOne(where);
        if (isClient)       return {isClient, msg:"is Client"}
        const isProfessional = await Professional.findOne(where);
        if (isProfessional) return {isProfessional, msg:"is Professional"};
        const isAdmin =        await Admin.findOne(where);
        if (isAdmin)        return {isAdmin, msg:"is Admin"};
        return { error: "not found" };
    } catch (error) {
        console.log(error)
    }
}
module.exports = {getUserById,getUserByEmail}