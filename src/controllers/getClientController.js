const {Client} = require("../db")

const getClientController= async function (req,res,next) {
    const {id}=req.params
    try {
        const client = await Client.findOne(
            {where: {id:id}}
        )

        if (!client) res.json("Not found")
        else res.json()

    } catch (error) {
        
    }


    
}

module.exports = getClientController