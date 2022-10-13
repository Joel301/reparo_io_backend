// const {Professionals, Professions} = require("../db")
// const {Op}=require("sequelize")

export default async function (search) {
    try {
        // const profsDB = await Professionals.findAll({
        //     where: {
        //         name: {
        //             [Op.iLike]: `%${search}`
        //         }
        //     },
        //     include: Professions
        // })
        
        //Aplicando formato a la data
        const searchedProfsDB=[]
        profsDB.forEach((element) => {
            searchedProfsDB.push({
                id: element.id,
                name: element.name,
                reputation: element.reputation,
                profileImg: element.profileImg ?
                element.profileImg
                : "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
                professions: element.professions.map((element) =>{
                    return element.name
                })
            }) 
        })

        return searchedProfsDB

    } catch (e) {
        e.message="error at searching at database"
    }


}