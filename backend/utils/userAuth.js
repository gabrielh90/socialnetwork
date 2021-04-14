const UserAccount = require('../models/userAccount.model');
const UserAuth = require('../models/userAuth.model');
const crypto = require('crypto');

function getUserAccountById(userId) {
    return UserAccount.findOne({
        _id: userId,
    })
}
function passwordAuthentication (req) {
    // var response = {
    //     authenticated: false,
    //     error: 'Something went wrong in: ' + arguments.callee.name
    // }
    return UserAccount.findOne({
        email: req.body.email,
        password: req.body.password
    })
}

async function checkToken (req) {
    var response = {
        authenticated: false,
        error: 'Something went wrong: ' + arguments.callee.name,
        userId: null
    }
    const bearerHeader = req.headers['authorization'];
    let bearerToken = '';
    if(bearerHeader) {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
    }
    if(bearerToken === '') return new Promise (resolve => {
        response = {
            ...response,
            error: 'Provide a token: ' + arguments.callee.name,
        }     
        resolve(response)
    });
    // if(req.body['token'] === '') return new Promise (resolve => {
    //     response = {
    //         ...response,
    //         error: 'Provide a token: ' + arguments.callee.name,
    //     }     
    //     resolve(response)
    // });
    
    await UserAuth.findOne({
        // email: req.body.email,
        token: bearerToken
    })
    .sort({created_at: -1})
    .then(res => {
        if (res !== null) {
            if ((new Date(res.logoutTime).getTime() - new Date().getTime()) > 0) {
                    response = {
                        ...response,
                        authenticated: true,
                        error: '',
                        userId: res.userId
                    }   
            } else {
                response = {
                    ...response,
                    authenticated: false,
                    error: 'Token has expired!'
                }
            }
        } else {
            response = {
                ...response,
                authenticated: false,
                error: 'Token doesn\'t exist!'
            }
        }
        
    })
    .catch(err => {
        response = {
            authenticated: false,
            error: err
        }    
        //throw response;
        return response;
    })
    return response;
}
async function checkTokenAndUpdateTimeout (req) {
    await checkToken(req)
    .then(response => {
        if(response.authenticated === false) return response;
        const logoutTime =  new Date(new Date().getTime() + process.env.SESSION_TIMEOUT * 1000);
        UserAuth.findOneAndUpdate(
            {_id: response.userId},
            {logoutTime: logoutTime});
            return {...response, logoutTime: logoutTime}
    })
}
function tokenAuthentication(req) {
    var response = checkTokenAndUpdateTimeout(req); //response contain logoutTimestamp
    if(response.authenticated === false) return response;

    return {userAccount: getUserAccountById(response.userId), response}
}



const checkAuthentication = (req) => { //req.body
    var response = {
        authenticated: true,
        error: ''
    }
    var auth;//memorize a user account if found
    if( 
        req.body.token !== null ||
        req.body.token !== undefined ||
        req.body.token !== ""
        ) {
            auth = tokenAuthentication(req)
    } else if(
        req.body.password !== null ||
        req.body.password !== undefined ||
        req.body.password !== ""
    ){
        auth = passwordAuthentication(req)
    }
    var response = {
        authenticated: true,
        error: ''
    }

    return response
    
}
const sendTokenResponse = async (user, statusCode, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const logoutTime =  new Date(new Date().getTime() + process.env.SESSION_TIMEOUT * 24 * 60 * 60 * 1000);
    const token = crypto.randomBytes(20).toString('hex');

    await UserAuth.create({
        userAccount: user._id,
        email: user.email,
        role: user.role,
        token,
        logoutTime
    })

    res.status(statusCode)
        .json({
            success: true,
            data: {
                userId: user._id,
                email: user.email,
                token,
                logoutTime}
        })
}
module.exports = {
    sendTokenResponse,
    passwordAuthentication,
    checkToken,
    checkTokenAndUpdateTimeout,
    tokenAuthentication,
    checkAuthentication
}