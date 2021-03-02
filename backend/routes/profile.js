const mongoose = require('mongoose');
const router = require('express').Router();
const {getRandomToken, arrayBufferToBase64}= require('../utility/utilityFunctions');
const {uploadImage} = require("../middleware/upload");
let UserProfile = require('../models/userProfile.model');
let UserAccount = require('../models/userAccount.model');
const {checkToken} = require("./../utility/userAuth");


const getProfile = async (req, res) => {
    // console.log(arguments.callee.name);
    console.log(req.params);
    console.log(req.body);
    // if( req.query['name'].toString().trim() === '') {res.json([]); return}
    // const matchExpr = new RegExp('.*' + req.query['name'].toString().trim().replace(' ', '.*') + '.*', 'i');
    // req.body['token'] = '';
    // const userAuth = await checkToken(req);
    // console.log(userAuth);
    // checkToken(req)
    // .then(rsp => {
    //     console.log(rsp);
    // })
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        UserProfile.findOne({_id: req.params.id})
            .populate('userId')
            .then(user => {
                // console.log(user);
                const userAvatar = user.userId['userAvatar'] !== undefined && user.userId['userAvatar'] !== null ? arrayBufferToBase64(user.userId['userAvatar'].buffer, user.userId['avatarType']) : null
                const coverPhoto = user['coverPhoto'] !== undefined && user['coverPhoto'] !== null ? arrayBufferToBase64(user['coverPhoto'].buffer) : null
                arrayRsp = {
                    userProfileId: user.userId['userProfileId'],
                    firstName: user.userId['firstName'],
                    lastName: user.userId['lastName'],
                    email: user.userId['email'],
                    bornDate: user.userId['bornDate'],
                    userAvatar: userAvatar,
                    coverPhoto: coverPhoto,
                    shortDescription: user['shortDescription'],
                    homeTown: user['homeTown'],
                    workplace: user['workplace'],
                    school: user['school'],
                    relationship: user['relationship'],
                }
                res.json(arrayRsp)
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        res.status(404).json({
            error: 'Page is not available',
        })
    }
    // res.json({msg: 'totul bine' + req.params.id});
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
}

const updateProfile = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404).json({
            error: 'Page is not available',
        })
        return;
    }
    await uploadImage(req, res)
                .catch((error) => {
                    console.log(error);
            });
    // console.log(arguments.callee.name);
    console.log(req.params);
    console.log(req.body);
    console.log(req.file);

    const userAccFields = ["firstName", "lastName", "email", "password", "userAvatar"];

    const isUserAuthenticated = await checkToken(req);
    console.log(isUserAuthenticated)
    if(isUserAuthenticated.authenticated === true) {
        let image;
        if(req.file !== undefined) {
            const fs = require('fs')
            image = fs.readFileSync(req.file.path);
        }

        await UserAccount.findOne({
            _id: isUserAuthenticated.userId,
            userProfileId: req.params.id
        }).then(user => {
            if(!user) {
                res.json({
                    authenticated: true,
                    message: 'Something went wrong!'
                    // message: 'Or Profile doesn\'t exist!'
                    // message: 'Or You have tried to modify someone else\'s profile!'
                })
                return;
            }
            let userAccountData = {}
            let userProfileData = {}
            if(req.file !== undefined) {
                if(userAccFields.indexOf(req.file.originalname) > -1) {
                    userAccountData[req.file.originalname] = image;
                } else {
                    userProfileData[req.file.originalname] = image;
                }
            }
            Object.keys(req.body).map((value, idx) => {
                if(userAccFields.indexOf(value) > -1) {
                    userAccountData[value] = req.body[value];
                } else {
                    userProfileData[value] = req.body[value];
                }
            })
            console.log(userAccountData)
            console.log(userProfileData)
            if(Object.keys(userAccountData).length > 0) {
                UserAccount.findOneAndUpdate(
                {_id: isUserAuthenticated.userId,
                userProfileId: user.userProfileId},
                userAccountData)
                .then(userAccountBeforeUpdat => {
                console.log(userAccountBeforeUpdat)
                })
            }
            if(Object.keys(userProfileData).length > 0) {
                UserProfile.findOneAndUpdate(
                {_id: user.userProfileId},
                userProfileData)
                .then(userProfileBeforeUpdate => {
                console.log(userProfileBeforeUpdate)
                })
            }
            res.json({
                authenticated: true,
                message: 'Fields have been updated!'
            })
        })
    } else {
        res.json({
            authenticated: false,
            error: isUserAuthenticated.error
        })
    }
}
module.exports = {getProfile, updateProfile}
