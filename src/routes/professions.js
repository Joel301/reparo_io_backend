const { Router } = require('express')
const router = Router()
const { infoProfessions } = require('../controllers/professions')


router.get('/', async (req, res, next)=>{
    try {
        //let profsDb= await infoProfessions();
        //const filterDb= profsDb.map(p=>{
        //        return{
        //            id: p.id,
        //            name: p.name
        //        }
        //    });
        //res.send(filterDb);
        let profsDb= await infoProfessions();
        res.send(profsDb);
    } catch (error) {
        next(error)
    }
});

module.exports = router;