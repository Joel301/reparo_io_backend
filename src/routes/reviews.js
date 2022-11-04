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
router.put('/', updateReview);//pasar por body clientId, professionalId

module.exports =  router;
