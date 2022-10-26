const { User, Professional, Admin, Client } = require("../db.js");

async function getUserById(id) {
    try {
        const ID = id
        const currentUser = await User.findByPk(ID, { include: [Professional, Admin, Client] })
        console.log(currentUser)
        if (!currentUser) return { error: "not found" }
        return currentUser
    } catch (error) {
        console.log(error)
    }

}

module.exports = getUserById