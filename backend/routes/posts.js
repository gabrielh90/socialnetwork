const router = require('express').Router();
const {getRandomToken, arrayBufferToBase64} = require('./../utility/utilityFunctions');
let UserProfile = require('../models/userProfile.model');

const getPosts = async (req, res) => {

        console.log(req.body);
        const expireIn = 11200;
        const logoutTime =  new Date(new Date().getTime() + expireIn * 1000);

        try{
            auth.then(
                user => {
                    if(user != null && response.authenticated === true) {
                        // console.log(user)
                        // var fs = require('fs');
                        // fs.writeFileSync(__basedir + '/images/' + user.avatarName, user.userAvatar);

                        const token = passwordAuthentication === true ?  getRandomToken() : req.body.token;

                        response = {
                            authenticated: true,
                            token: token,
                            logoutTime: logoutTime,
                            userProfileId: user.userProfileId,
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
                console.log(err);
                    response = {
                        authenticated: false,
                        error: err
                    }    
                    res.status(400).json(response)
                }
            )
        } catch (err) {
            //     response = {
            //         authenticated: false,
            //         error: err
            //     }    
            //     res.status(400).json(response)
        }
}


router.route('').get((req, res) => {

    // if( req.query['name'].toString().trim() === '') {res.json([]); return}
    // const matchExpr = new RegExp('.*' + req.query['name'].toString().trim().replace(' ', '.*') + '.*', 'i');
    console.log("getProfile");
    console.log(req.params);
    res.json({msg: 'totul bine'});
    // UserProfile.
    // UserAccount.aggregate(
    //     [
    //         {$project: {
    //             email: 1,
    //             userProfileId: 1,
    //             userAvatar: 1,
    //             avatarType: 1,
    //             firstlastname: {$concat: ["$firstName", " ", "$lastName"]},
    //             lastfirstname: {$concat: ["$lastName", " ", "$firstName"]}
    //         }},
    //         {$match: {$or: [
    //             {firstlastname: matchExpr},
    //             {lastfirstname: matchExpr},
    //         ]}}
    //         // {$match: {$or: [
    //         //     {firstlastname: {$regex: /Barney.*/, $options: "si"}},
    //         // ]}}
    //     ]
    // )
    // .then(response => {
    //         // Object.keys(response).forEach(function(key){
    //         //     delete response[key]['_id'];
    //         //     delete response[key]['lastfirstname'];
    //         //     arrayBufferToBase64(response[key]['userAvatar'], response[key]['avatarType']);
    //         // })

    //         arrayRsp = Object.keys(response).map(function(key){
    //             let avatar;
    //             return {
    //                 userProfileId: response[key]['userProfileId'],
    //                 fullname: response[key]['firstlastname'],
    //                 email: response[key]['email'],
    //                 avatar: arrayBufferToBase64(response[key]['userAvatar'].buffer, response[key]['avatarType'])
    //             }
    //         })
    //         // console.log(arrayRsp)
    //         res.json(arrayRsp);
    //         // return response
    //     }
    // )
    // .catch(err => {
    //         console.log(err)
    //         res.status(400).json(error)
    //     }
    // )
})


module.exports = router
