const router = require('express').Router({mergeParams: true});
const {protect, checkToken} = require('../middleware/auth');

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews');



router
    .route('/')
    .get(protect, getReviews)
    .post(protect, createReview)
router
    .route('/:reviewId')
    .get(checkToken, getReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview)

module.exports = router
