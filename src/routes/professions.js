const { Router } = require('express')
const router = Router()
const { infoProfessions, postProfessions } = require('../controllers/professions')


router.get('/', async (req, res, next) => {
    try {
        //let profsDb= await infoProfessions();
        //const filterDb= profsDb.map(p=>{
        //        return{
        //            id: p.id,
        //            name: p.name
        //        }
        //    });
        //res.send(filterDb);
        let profsDb = await infoProfessions();
        res.send(profsDb);
    } catch (error) {
        next(error)
    }
});
router.post('/', async (req, res, next) => {
    const { name } = req.body;
    const { isnew, newProfessional } = await postProfessions({ name })
    if (!isnew) {
        res.send({ message: "Ya existia", newProfessional })
    } else {
        res.send(newProfessional)
    }
})

module.exports = router;