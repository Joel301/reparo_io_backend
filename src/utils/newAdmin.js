const { User, Admin } = require("../db.js");

const authid = "H1PjHjLexlUWiy0ibh7ET2G5Uk53"

const firstName = "admin"
const lastName = "admin"
const phoneNumber = "admin"
const address = "admin"
const email = "admin@reparo.io"
const password = "qwerty0987"

async function run() {
    const newUsuario = await User.create({ email, uid: authid })
    const newAdmin = await Admin.create({
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        password
    })
    newUsuario.setAdmin(newAdmin)
}

run().then(()=>console.log('done'))