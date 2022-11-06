const { Router } = require("express");
const { 
    getReviews,
    getReviewsProfessional, 
    getReviewsClient,
    createReview, 
    updateReview,
    deleteReview
} = require('../controllers/reviews')
const router = Router();
router.get('/', getReviews); // Sin body trae todo, 
                            //con clientId en body todos los review de clientId
                            //con professionalId en body todos los review de professionalId
                            //con clientId y professionalId en body todos los review de clientId-professionalID
router.post('/', createReview);
router.delete('/',deleteReview);//pasar por body clientId, professionalId
router.put('/', updateReview);//pasar por body clientId, professionalId

module.exports =  router;

// const { 
//         getReviews, 
//         getReviewsProfessional, 
//         getReviewsClient, 
//         createReview, 
//         updateReview 
//     } = require('../controllers/reviews')


// routes.get('/reviews', getReviews)
// routes.get('/reviewsProfessional/:professionalId', getReviewsProfessional)
// routes.get('/reviewsClient/:clientId', getReviewsClient)
// //Cient
// routes.post('/reviews/:clientId', createReview)
// routes.put('/reviews/:reviewId', updateReview)

// module.exports = { routes }
