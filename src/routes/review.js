const { 
    getReviews, 
    getReviewsprofessional, 
    getReviewsClient, 
    createReview, 
    updateReview 
} = require('../controllers/reviews')


routes.get('/reviews', getReviews)
routes.get('/reviewsProfessional/:professionalId', getReviewsprofessional)
routes.get('/reviewsClient/:clientId', getReviewsClient)
//Cient
routes.post('/reviews/:clientId', createReview)
routes.put('/reviews/:reviewId', updateReview)

module.exports = { routes }



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