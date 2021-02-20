const router = require('express').Router();
const {arrayBufferToBase64}= require('./../utility/utilityFunctions');
let UserAccount = require('../models/userAccount.model');
const {checkToken} = require("./../utility/userAuth");

getUsers = (req, res) => {
    // console.log(req.params);
    console.log(req.body);
    // console.log(req.query);
    // console.log(req.headers);

    if( req.body['name'].toString().trim() === '') {res.json([]); return}
    const matchExpr = new RegExp('.*' + req.body['name'].toString().trim().replace(' ', '.*') + '.*', 'i');



    UserAccount.aggregate(
        [
            {$project: {
                email: 1,
                userProfileId: 1,
                userAvatar: 1,
                avatarType: 1,
                firstlastname: {$concat: ["$firstName", " ", "$lastName"]},
                lastfirstname: {$concat: ["$lastName", " ", "$firstName"]}
            }},
            {$match: {$or: [
                {firstlastname: matchExpr},
                {lastfirstname: matchExpr},
            ]}}
            // {$match: {$or: [
            //     {firstlastname: {$regex: /Barney.*/, $options: "si"}},
            // ]}}
        ]
    )
    .then(userProfiles => {
            // Object.keys(userProfiles).forEach(function(key){
            //     delete userProfiles[key]['_id'];
            //     delete userProfiles[key]['lastfirstname'];
            //     arrayBufferToBase64(userProfiles[key]['userAvatar'], userProfiles[key]['avatarType']);
            // })
            const user = checkToken(req);
            
            arrayRsp = Object.keys(userProfiles).map(function(key){
                return {
                    userProfileId: userProfiles[key]['userProfileId'],
                    fullname: userProfiles[key]['firstlastname'],
                    email: userProfiles[key]['email'],
                    avatar: arrayBufferToBase64(userProfiles[key]['userAvatar'].buffer, userProfiles[key]['avatarType'])
                }
            })
            // console.log(arrayRsp)
            res.json(arrayRsp);
            // return userProfiles
        }
    )
    .catch(err => {
            console.log(err)
            res.status(400).json(error)
        }
    )
}


module.exports = {getUsers}
