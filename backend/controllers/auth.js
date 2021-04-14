const asyncHandler = require('./../middleware/async');
const ErrorResponse = require('./../utils/errorResponse');
const {UserAccount, UserAuth} = require('../models');
const {sendTokenResponse} = require('./../utils/userAuth');
const crypto = require('crypto');

// @desc   Login User
// @route  POST /auth/login
// @access Public
const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    // console.log(req.body)
    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await UserAccount.findOne({
        email}).select('+password');
    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    await sendTokenResponse(user, 200, res);
});

// @desc   Log out user
// @route  /auth/logout
// @access Private
const logout = asyncHandler(async (req, res, next) => {
    await UserAuth.findOneAndUpdate(
        {token: req.token},
        {logoutTime: new Date().getTime()}
    );
    res.status(200).json({sucess: true})
})

// @desc   Check token and update timeout
// @route  POST /user/
// @route  Private
const checkTokenAndUpdateTimeout = asyncHandler(async (req, res, next) => {
    const logoutTime =  new Date(new Date().getTime() + process.env.SESSION_TIMEOUT * 24 * 60 * 60 * 1000);
    await UserAuth.findOneAndUpdate(
        {userAccount: req.userId,
         token: req.token},
        {logoutTime: logoutTime});
    
    return res.status(200)
            .json({ success: true, 
                    data:{
                        message: 'Token timeout updated', 
                        userId: req.userId, 
                        logoutTime: logoutTime
                }});
});

// @desc   Forgot password
// @route  POST /user/forgotpassword
// @access Public
const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await UserAccount.findOne({
        email: req.body.email,
    })
    //.select({'firstName': 1, 'lastName': 1, 'userAvatar': 1, 'avatarType': 1})

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Create reset url
    const resetUrl = `${baseUrl}/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const resetToken = user.getResetPasswordToken();
    // console.log(resetToken);

    try{
        await sendMail(
                user.email, 
                'Password reset token',
                message
            )
        await user.save({ validateBeforeSave: false});
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch(err) {
        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

// @desc   Reset password
// @route  PUT /resetpassword/:resettoken
// @access Public
const resetPassword = asyncHandler(async (req, res, next) => {
    //Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex')

    const user = await UserAccount.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    await sendTokenResponse(user, 200, res);
})

module.exports = {
    login,
    logout,
    checkTokenAndUpdateTimeout,
    forgotPassword,
    resetPassword
}