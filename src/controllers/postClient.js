const { User, Client } = require("../db.js");
const { isStringOk, isEmail } = require("../services/validaciones");

async function postClient(data) {
    const { firstName, lastName, address, email } = data;
    try {
        isStringOk([firstName, lastName, address]);
        isEmail(email);
        const newClient = await Client.create(data);
        return newClient
    } catch (e) {
        console.log(e)
        return { error: "error at creating client" }
    }
}
module.exports = postClient
