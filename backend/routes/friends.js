const router = require('express').Router();
const {
    getFriends,
    removeFriend,
    getSentFriendRequests,
    sendFriendRequest,
    cancelFriendRequest,
    getReceivedFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
} = require('./../controllers/friends.js')
const {advancedResults, formatResult} = require('./../middleware/advancedResults');

const {protect} = require('./../middleware/auth');

router.use(protect);



router
    .route('/sentFriendRequests')
    .get(getSentFriendRequests);
router
    .route('/sentFriendRequests/:id')
    .get(getSentFriendRequests) //add admin protection
    .put(sendFriendRequest)
    .delete(cancelFriendRequest);

router
    .route('/receivedFriendRequests')
    .get(getReceivedFriendRequests);
router
    .route('/receivedFriendRequests/:id')
    .get(getReceivedFriendRequests) //add admin protection
    .put(acceptFriendRequest)
    .delete(declineFriendRequest);

router
    .route('/')
    .get(getFriends);
router
    .route('/:id')
    .get(getFriends)
    .delete(removeFriend);

module.exports = router;
