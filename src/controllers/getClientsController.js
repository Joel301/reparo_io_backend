const {Client} = require("../db")

const getClientsController = async function (req,res,next) {

    try {

        const results = await Client.findAll()
        
        if (!results) res.json("no client found")
        else res.json(results)
        
    } catch (error) {
        error.message="error at getting all clients"
        next(error)
        
    }
    
}

module.exports = getClientsController