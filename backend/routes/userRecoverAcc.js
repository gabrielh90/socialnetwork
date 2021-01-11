const router = require('express').Router();
let UserAccount = require('../models/userAccount.model');
const {getRandomToken, sendMail} = require('../utility');
const UserRecoverAccount = require('../models/userRecoverAccount');


router.route('/').post((req, res) => {
    UserAccount.findOne({
        email: req.body.email,
    })
    //.select({'firstName': 1, 'lastName': 1, 'userAvatar': 1, 'avatarType': 1})
    .then(
        user => {
            let response = {
                found: false,
                message: 'The user doesn\'t exist!'
            }
            // console.log(req.body);
            if(user !== null && req.body.searchEmail === true) {
                var fs = require('fs');
                response = {
                    // authenticated: 'true',
                    // token: token,
                    // logoutTime: logoutTime,
                    email: user.email,
                    userAvatar: user.userAvatar,
                    // avatarType: user.avatarType,
                    // avatarName: user.avatarName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    found: true
                    // avatarUrl: __basedir + '/images/' + user.avatarName
                }
            }
            if(user !== null && req.body.sendMail === true) {
                const randomToken = getRandomToken();
                // console.log(randomToken);
                let responseMail =''
                try{
                    responseMail = 
                        sendMail(
                            user.email, 
                            'Facebook recover account!',
                            baseUrl + '/recover/'+ randomToken
                        )
                } catch(err) {
                    response = {
                        error: true,
                        message: err
                    }
                    // console.log('Erroarea')
                }

                if(responseMail.error) {
                    response = {
                        error: true,
                        message: 'There is a problem with the mail!'
                    }
                } else {
                    const newUser =  new UserRecoverAccount({
                        userId: user._id,
                        token: randomToken,
                        valid: true
                    });
                    
                    newUser.save();
                        
                    response = {
                        error: false,
                        message: 'Recovery mail send! Check your mailbox!'
                    }
                }
            }
            res.json(response);
            // res.json(response);
            // res.header("content-type", "application/json; charset=utf-8");
            // res.contentType('json');
            // res.send(response);
        }
    )
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;