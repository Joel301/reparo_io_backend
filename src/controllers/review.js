const { Review, Client, Professional } = require('../db')

const getReviews = async (req, res) => {
    try {
        const response = await Review.findAll(
        {
            include: [Client, Professional],
        },
        { raw: true }
        )
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}

const createReview = async (req, res) => {
    const { clientId: id } = req.params
    const { professionalId, comment, rating } = req.body

    try {
        const client = await Client.findByPk(id)
        if (!client) return res.status(400).send({ 
            msg: `El cliente ${id} no existe en la base de datos.` 
        })

        const professional = await Professional.findByPk(professionalId)
        if (!professional) return res.status(400).send({ 
            msg: `El professional ${id} no existe en la base de datos.` 
        })

        const iContract = await client.getOrders()
        const [orders] = iContract
        if (!iContract.length) return res.status(400).send({ 
            msg: `No has contratado aún este professional.` 
        })

        const check = orders.dataValues.details.find(obj => obj.professionalId == professionalId)
        if (!check) return res.status(400).send({ msg: `No has contratado aún este professional.` })

        const review = await Review.create({
        comment,
        rating,
        })

    await review.setclient(id)
    await review.setprofessional(professionalId)

    let reviews = await professional.getReviews()
    await Professional.update(
        {
            rating: reviews.map(e => e.rating).reduce((a, b) => a + b) / reviews.length,
        },
        {
            where: { id: professionalId },
        }
    )

    const professionalReviews = await Professional.findByPk(
        professionalId,
        {
            include: [
            {
                model: Review,
                include: Client,
            },
            ],
        },
        { raw: true }
    )

    res.status(200).send({ msg: 'Review creada con éxito.', 
    reviews: professionalReviews ? professionalReviews.reviews : [] })
    } catch (error) {
        res.status(500).send({ msg: 'Error interno del servidor.', error })
    }
}

const updateReview = () => {}

const getReviewsprofessional = async (req, res) => {
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

const getReviewsclient = async (req, res) => {
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
    getReviewsprofessional,
    getReviewsclient,
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