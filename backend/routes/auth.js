const router = require('express').Router();
const {
    login,
    logout,
    checkTokenAndUpdateTimeout,
    forgotPassword,
    resetPassword
} = require('./../controllers/auth');
const {protect, checkToken} = require('./../middleware/auth');

router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/renewtokentimeout', protect, checkTokenAndUpdateTimeout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;