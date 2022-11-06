const { Review, Client, Professional } = require('../db')


let isUUID =
    /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/gi;

const getReviews = async (req, res) => {
    const {clientId,professionalId} = req.body;
    let where = {};
    if (clientId)where = {...where, clientId: clientId }
    if (professionalId) where = {...where, professionalId: professionalId }
    console.log(where);
    try {
        const response = await Review.findAll(
            {
                where: where,
                include: [Client, Professional],
            },
            { raw: true }
        );
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}

const createReview = async (req, res) => {

    const { clientId, professionalId, comment, rating } = req.body

    if (clientId.search(isUUID) != 0) {
        res.status(400).send({ msg: `uuid de clientId invalido: ${clientId}` })
        return
    }
    if (professionalId.search(isUUID) != 0) {
        res.status(400).send({ msg: `uuid de professionalId invalido: ${professionalId}` })
        return
    }

    try {

        const client = await Client.findByPk(clientId);
        if (!client) return res.status(400).send({
            msg: `El cliente ${id} no existe en la base de datos.`
        })

        const professional = await Professional.findByPk(professionalId);
        if (!professional) return res.status(400).send({
            msg: `El professional ${professional.id} no existe en la base de datos.`
        })

        const [review, created] = await Review.findOrCreate({
            where: {
                clientId,
                professionalId,
            },
            defaults: {
                comment,
                rating
            }
        })
        console.log(created)
        if (!created) {
            review.comment = comment
            review.rating = rating
            await review.save()
        }

        let reviews = await Review.findAll({
            where: {
                professionalId,
            }
        })
        const newRating = reviews.map(e => e.rating).reduce((a, b) => a + b) / reviews.length
        professional.rating = parseFloat(parseFloat(newRating).toFixed(2))
        await professional.save()
        // await Professional.update(
        //     {
        //         rating: reviews.map(e => e.rating).reduce((a, b) => a + b) / reviews.length,
        //     },
        //     {
        //         where: { id: professionalId },
        //     }
        // )

        // const professionalReviews = await Professional.findByPk(
        //     professionalId,
        //     {
        //         include: [
        //             {
        //                 model: Review,
        //                 include: Client,
        //             },
        //         ],
        //     },
        //     { raw: true }
        // )

        res.status(200).send({
            msg: 'Review creada con éxito.',
            reviews//: professionalReviews ? professionalReviews.reviews : []
        })
    } catch (error) {
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}
const updateReview = async (req, res) => {
    const { clientId, professionalId, comment, rating } = req.body


const updateReview = async (req, res) => {
    const { clientId, professionalId, comment, rating } = req.body

    if (clientId.search(isUUID) != 0) {
        res.status(400).send({ msg: `uuid de clientId invalido: ${clientId}` })
        return
    }
    if (professionalId.search(isUUID) != 0) {
        res.status(400).send({ msg: `uuid de professionalId invalido: ${professionalId}` })
        return
    }
    const professional = await Professional.findByPk(professionalId);
    if (!professional) return res.status(400).send({
        msg: `El professional ${professional.id} no existe en la base de datos.`
    });
    try {
            const review = await Review.findOne(
                {
                    where: 
                    {
                        clientId: clientId,
                        professionalId:professionalId
                    }
                }
                );
        if (review) {
            review.comment = comment;
            review.rating = rating;
            await review.save();
            res.json({ review, message: "review updated" });
            let reviews = await Review.findAll({
                where: {
                    professionalId,
                }
            })
            const newRating = reviews.map(e => e.rating).reduce((a, b) => a + b) / reviews.length
            professional.rating = parseFloat(parseFloat(newRating).toFixed(2));
            console.log(professional.rating);
            await professional.save();
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error actualizando review.', error })
    }

}

const deleteReview = async (req, res,next) => {
    const {clientId, professionalId} = req.body;
    try {
        const review = await Review.findOne(
            {
                where: 
                {
                    clientId: clientId,
                    professionalId:professionalId
                }
            }
            );
            if (review) {
                console.log("Encontre el review",review);
                review.destroy();
            res.json({ message: "..review deleted!" });
            }
            else{
                console.log("NO lo encontre el review");
                res.json({ message: "..can't be deleted!" });
            } 
    }
    catch (error) {
        next(error);
      }
};

const getReviewsProfessional = async (req, res) => {
    const { professionalId: id } = req.params

    try {
        const response = await Professional.findByPk(id, {
            include: [
                {
                    model: Review,
                    include: Client,
                },
            ],
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}

const getReviewsClient = async (req, res) => {
    const { clientId: id } = req.params

    try {
        const response = await Client.findByPk(id, {
            include: [
                {
                    model: Review,
                    include: Professional,
                },
            ],
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReviewsProfessional,
    getReviewsClient,
}

// const { Review, Client, Professional } = require('../db')

// const getReviews = async (req, res) => {
//     try {
//         const response = await Review.findAll(
//         {
//             include: [Client, Professional],
//         },
//         { raw: true }
//         )
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(500).send({ msg: 'Error interno del servidor.', error })
//     }
// }

// const createReview = async (req, res) => {
//     const { clientId: id } = req.params
//     const { professionalId, comment, rating } = req.body

//     try {
//         const client = await Client.findByPk(id)
//         if (!client) return res.status(400).send({
//             msg: `El cliente ${id} no existe en la base de datos.`
//         })

//         const professional = await Professional.findByPk(professionalId)
//         if (!professional) return res.status(400).send({
//             msg: `El professional ${id} no existe en la base de datos.`
//         })

//         const iContract = await client.getOrders()
//         const [orders] = iContract
//         if (!iContract.length) return res.status(400).send({
//             msg: `No has contratado aún este professional.`
//         })

//         const check = orders.dataValues.details.find(obj => obj.professionalId == professionalId)
//         if (!check) return res.status(400).send({ msg: `No has contratado aún este professional.` })

//         const review = await Review.create({
//         comment,
//         rating,
//         })

//     await review.setclient(id)
//     await review.setprofessional(professionalId)

//     let reviews = await professional.getReviews()
//     await Professional.update(
//         {
//             rating: reviews.map(e => e.rating).reduce((a, b) => a + b) / reviews.length,
//         },
//         {
//             where: { id: professionalId },
//         }
//     )

//     const professionalReviews = await Professional.findByPk(
//         professionalId,
//         {
//             include: [
//             {
//                 model: Review,
//                 include: Client,
//             },
//             ],
//         },
//         { raw: true }
//     )

//     res.status(200).send({ msg: 'Review creada con éxito.',
//     reviews: professionalReviews ? professionalReviews.reviews : [] })
//     } catch (error) {
//         res.status(500).send({ msg: 'Error interno del servidor.', error })
//     }
// }

// const updateReview = () => {}

// const getReviewsProfessional = async (req, res) => {
//     const { professionalId: id } = req.params

//     try {
//         const response = await Professional.findByPk(id, {
//         include: [
//             {
//             model: Review,
//             include: Client,
//             },
//         ],
//         })

//     res.status(200).json(response)
//     } catch (error) {
//         res.status(500).send({ msg: 'Error interno del servidor.', error })
//     }
// }

// const getReviewsClient = async (req, res) => {
//     const { clientId: id } = req.params

//     try {
//         const response = await Client.findByPk(id, {
//         include: [
//             {
//             model: Review,
//             include: Professional,
//             },
//         ],
//         })

//     res.status(200).json(response)
//     } catch (error) {
//         res.status(500).send({ msg: 'Error interno del servidor.', error })
//     }
// }

// module.exports = {
//     getReviews,
//     createReview,
//     updateReview,
//     getReviewsProfessional,
//     getReviewsClient,
// }
