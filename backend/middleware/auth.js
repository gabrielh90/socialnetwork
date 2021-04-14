const {UserAuth} = require('../models/');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

const protect = asyncHandler (async (req, res, next) => {
    let bearerToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        bearerToken = req.headers.authorization.split(' ')[1];
    }
    if(!bearerToken || bearerToken === '') {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    const userAuth = await UserAuth.findOne({
        // email: req.body.email,
        token: bearerToken
    })

    if(!userAuth) {
        return next(new ErrorResponse('Not authorized to access this route', 401,
                                        {authenticated: false,
                                        error: 'Invalid token!'}));
    }
    if ((new Date(userAuth.logoutTime).getTime() - new Date().getTime()) < 0) {
        return next(new ErrorResponse('Not authorized to access this route', 401, 
                                        {authenticated: false,
                                        error: 'Token has expired!'}));
    }

    req.userId = userAuth.userAccount;
    req.token = bearerToken;

    next();
});

const checkToken = asyncHandler (async (req, res, next) => {
    let bearerToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        bearerToken = req.headers.authorization.split(' ')[1];
    }
    if(!bearerToken || bearerToken === '') {
        return next();
    }
    const userAuth = await UserAuth.findOne({
        // email: req.body.email,
        // device: req.body.device,
        token: bearerToken
    })
    if(!userAuth) {
        return next();
    }
    req.userId = userAuth.userAccount;
    req.token = bearerToken;

    next();
});


module.exports = {
    protect,
    checkToken
}