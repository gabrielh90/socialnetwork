const router = require('express').Router();
const {protect, checkToken} = require('./../middleware/auth');

// Include other resource routers
const reviewRouter = require('./reviews');

const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('./../controllers/posts');

// Re-route into other resource routers
router.use('/:postId/reviews', reviewRouter);

router
    .route('/')
    .get(protect, getPosts)
    .post(protect, createPost)
router
    .route('/:id')
    .get(checkToken, getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router
