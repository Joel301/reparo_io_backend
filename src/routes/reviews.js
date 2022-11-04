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

router.get('/', getReviews)
// router.get('/reviewsProfessional/:professionalId', getReviewsProfessional)
// router.get('/reviewsClient/:clientId', getReviewsClient)
//
router.post('/', createReview);
router.delete('/',deleteReview);//pasar por body clientId, professionalId
// router.put('/:reviewId', updateReview);

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