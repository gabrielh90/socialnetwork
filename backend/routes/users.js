const router = require('express').Router();
const UserAccount = require('./../models/userAccount.model');
const {advancedResults} = require('./../middleware/advancedResults');
const {protect, checkToken} = require('./../middleware/auth');
const postsRouter = require('./posts');

const {
    getUsers,
    searchUserByName,
    getUser,
    getMe,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

router.use('/:userId/posts', postsRouter);

router
    .route('/')
    .post(createUser)
    .get(advancedResults(UserAccount, null, {select: 'email,avatar,avatarType,avatarName,firstName,lastName'}), getUsers);
router
    .route('/searchuserbyname')
    .get(searchUserByName);
router
    .route('/me')
    .get(protect, getMe);
router
    .route('/:id')
    .get(checkToken, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser);


module.exports = router;
