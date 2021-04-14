const sendMail = require('./sendEmail');
const ErrorResponse = require('./errorResponse')
const {
    passwordAuthentication,
    checkToken,
    checkTokenAndUpdateTimeout,
    tokenAuthentication,
    checkAuthentication
} = require('./userAuth');
const {getRandomToken, arrayBufferToBase64} = require('./utilityFunctions');

module.exports = {
    ErrorResponse,
    sendMail,
    passwordAuthentication,
    checkToken,
    checkTokenAndUpdateTimeout,
    tokenAuthentication,
    checkAuthentication,
    getRandomToken,
    arrayBufferToBase64,
}