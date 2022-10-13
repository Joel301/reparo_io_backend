import searchService from "../services/searchService"

export default async function searchController (req,res,next) {
    const {search} = req.query

    try {
        const data = await searchService(search)
        res.json(data)
    } catch (e) {
        e.message="error from search controller"
        next(e)
    }
    
}
