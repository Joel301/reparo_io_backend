const {searchService} = require("../services/searchService")

const searchController = async function (req,res,next) {
    const {search} = req.query

    try {
        const data = await searchService(search)
        res.json(data)
    } catch (e) {
        e.message="error from search controller"
        next(e)
    }
    
}

module.exports={
    searchController
}