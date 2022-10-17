const {searchService} = require("../services/searchService")

const searchController = async function (req,res,next) {
    const {search} = req.query

    try {
        const data = await searchService(search)
        if (data== ["No professional found"]){
            res.status(204) // El status 204 significa sin contenido relacionado
        }
        res.json(data)
    } catch (e) {
        e.message="error from search controller"
        next(e)
    }
    
}

module.exports={
    searchController
}