const router = require('express').Router();
const getRandomToken = require('./../utility/utilityFunctions');
let UserAccount = require('../models/userAccount.model');
let UserAuths = require('../models/userAuths.model');


const checkUser = (req) => {
    if(req.body.token === null) {
        return UserAccount.findOne({
            email: req.body.email,
            password: req.body.password
        })
    } else {
        return UserAuths.findOne({
            email: req.body.email,
            token: req.body.token
        }).then(res => 
            UserAccount.findOne({
                _id: res.body.userId,
            })
        )
    }
}

router.route('/').post((req, res) => {

    // UserAuths.findOne({
    //     email: email,
    //     token: token
    // })
    // UserAccount.findOne({
    //     email: req.body.email,
    //     password: req.body.password
    // })
        //checkUser(req)

    console.log(req.body);
    const expireIn = 11200;
    const logoutTime =  new Date(new Date().getTime() + expireIn * 1000);
    const passwordAuthentication = req.body.token === undefined;
    var response = {
        authenticated: true,
        error: ''
    }
    if(passwordAuthentication) {
        auth = UserAccount.findOne({
            email: req.body.email,
            password: req.body.password
        });//.then(response => response)
    } else {
        auth = UserAuths.findOne({
            email: req.body.email,
            token: req.body.token
        })
        .sort({created_at: -1})
        .then(res => {
            if (res !== null) {
                if ((new Date(res.logoutTime).getTime() - new Date().getTime()) > 0) {
                    UserAuths.findOneAndUpdate(
                                    {_id: res._id},
                                    {logoutTime: logoutTime});
                        console.log('auth token');
                    return UserAccount.findOne({
                            _id: res.userId,
                        })
                } else {
                    response = {
                        authenticated: false,
                        error: 'Token has expired!'
                    }
                }
            } else {
                response = {
                    authenticated: false,
                    error: 'Token doesn\'t match!'
                }
            }
            return response;
        })
    }
        
    auth.then(
            user => {
                if(user != null && response.authenticated === true) {
                    console.log(user)
                    // var fs = require('fs');
                    // fs.writeFileSync(__basedir + '/images/' + user.avatarName, user.userAvatar);

                    const token = passwordAuthentication === true ?  getRandomToken() : req.body.token ;

                    response = {
                        authenticated: true,
                        token: token,
                        logoutTime: logoutTime,
                        email: user.email,
                        userAvatar: user.userAvatar,
                        avatarType: user.avatarType,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        // avatarUrl: __basedir + '/images/' + user.avatarName
                    }
                    if ( passwordAuthentication ) {
                        const newUserAuths = new UserAuths({
                            userId: user._id,
                            email: user.email,
                            token: token,
                            logoutTime: logoutTime
                        })
                        newUserAuths.save()
                            .then(() => {
                                //console.log('User auth!')
                            })
                            .catch(err => {
                                // res.status(400).json('Error: ' + err)
                                console.log(err);
                                response = {
                                    authenticated: 'false',
                                    error: err
                                }
                            })
                    }
                } else if(user === null && response.authenticated === true){
                    response = {
                        authenticated: false,
                        error: 'The email or password doesn\'t match!'
                    }
                }
                // res.header("Access-Control-Allow-Origin", "*");
                
                // console.log(response);
                res.json(response);
                // return response
            }
        )
        .catch(err => {
                response = {
                    authenticated: false,
                    error: err
                }    
                res.status(400).json(response)
            }
        )
})


module.exports = router
