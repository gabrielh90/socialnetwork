const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const {sendTokenResponse} = require('./../utils/userAuth');
const {arrayBufferToBase64, checkToken}= require('../utils');
const {uploadImage, upload} = require("../middleware/upload");
const {UserAccount, UserProfile} = require('../models');
const fs = require('fs');
const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

const searchUserByName = asyncHandler(async (req, res, next) => {
    if( req.query['name'] === undefined || req.query['name'].toString().trim() === '') {
        res.status(200).json({
            success: true,
            data: []
        });
        return;
    }
    const matchExpr = new RegExp('.*' + req.query['name'].toString().trim().replace(' ', '.*') + '.*', 'i');

    const users = await UserAccount.aggregate(
        [
            {$project: {
                email: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1,
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
    ).project({firstlastname: 0, lastfirstname: 0})

    if(!users) {
        return next(new ErrorResponse(`User was not found!`, 404));
    }
    arrayRsp = Object.keys(users).map(function(key){
        return {
            userId: users[key]._id,
            firstName: users[key].firstName,
            lastName: users[key].lastName,
            email: users[key].email,
            avatar: users[key].avatar ? arrayBufferToBase64(users[key].avatar.buffer, users[key].avatarType) : null
        }
    })
    res.status(200).json({
        success: true,
        data: arrayRsp
    });
});

const getUser = asyncHandler(async (req, res, next) => {
    // console.log(arguments.callee.name);

    let query = UserAccount.findById(req.params.id);
    if(req.body.verbosity && req.body.verbosity > 5 || 1) {
        query = query.populate('userProfile');
    }
    user = await query;
    if(!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    // if(req.params.id !== req.userId.toString() && req.role !== 'admin') {
    //     return next(
    //     new ErrorResponse(
    //         `User ${req.userId} is not authorized to update this user: ${req.params.id}`, 401)
    //     );
    // }
    const avatar = user['avatar'] ? arrayBufferToBase64(user['avatar'].buffer, user['avatarType']) : undefined
    const coverPhoto = user.userProfile['coverPhoto'] ? arrayBufferToBase64(user.userProfile['coverPhoto'].buffer) : undefined;
    arrayRsp = {
        userId: user._id,
        firstName: user['firstName'],
        lastName: user['lastName'],
        email: user['email'],
        avatar
    }
    if(req.body.verbosity && req.body.verbosity > 5 || 1) {

        let friendStatus = !req.userId ? undefined
                            : user.userProfile['friends'].indexOf(req.userId) >= 0 ? 'friends'
                                : user.userProfile['friendRequestSent'].indexOf(req.userId) >= 0 ? 'friendRequestReceived'
                                    : user.userProfile['friendRequestReceived'].indexOf(req.userId) >= 0 ? 'friendRequestSent'
                                        : "stranger";
        arrayRsp = {
            ...arrayRsp,
            bornDate: user['bornDate'],
            coverPhoto,
            shortDescription: user.userProfile['shortDescription'],
            homeTown: user.userProfile['homeTown'],
            workplace: user.userProfile['workplace'],
            school: user.userProfile['school'],
            relationship: user.userProfile['relationship'],
            friendStatus
        }
    }
    // console.log(arrayRsp);
    res.status(200).json({
        success: true,
        data: arrayRsp
    });
});
const getMe  = asyncHandler(async (req, res, next) => {
    // console.log(arguments.callee.name);

    let query = UserAccount.findById(req.userId)
    if(req.body.verbosity && req.body.verbosity > 5) {
            query = query.populate('userProfile');
    }
    const user = await query
    if(!user) {
        return next(new ErrorResponse(`User not found with id of ${req.userId}`), 404);
    }
    
    const avatar = user['avatar'] ? arrayBufferToBase64(user['avatar'].buffer, user['avatarType']) : null
    // const coverPhoto = !user.userProfile['coverPhoto'] ? arrayBufferToBase64(user.userProfile['coverPhoto'].buffer) : null

    let arrayRsp = {
        userId: user._id,
        firstName: user['firstName'],
        lastName: user['lastName'],
        email: user['email'],
        bornDate: user['bornDate'],
        avatar: avatar,
    }
    if(req.body.verbosity && req.body.verbosity > 5) {
        arrayRsp = {
            ...arrayRsp,
            coverPhoto:  !user.userProfile['coverPhoto'] ? arrayBufferToBase64(user.userProfile['coverPhoto'].buffer) : undefined,
            shortDescription: user.userProfile['shortDescription'],
            homeTown: user.userProfile['homeTown'],
            workplace: user.userProfile['workplace'],
            school: user.userProfile['school'],
            relationship: user.userProfile['relationship'],
        }
    }
    res.status(200).json({
        success: true,
        data: arrayRsp
    });
});

const createUser = asyncHandler(async(req, res, next) => {
    let error = null;
    let user = null;
    await uploadImage(req, res)

    if (req.file === undefined) {
        return next(new ErrorResponse("Select a image for avatar!"), 400);
    }
    // console.log(req.file);
    var imageData = fs.readFileSync(req.file.path);
    // fs.writeFileSync(__basedir + '/images/tmp-me.png', imageData);

    await UserAccount.create({
        _id: req.body._id || undefined,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        avatar: imageData,
        avatarType: req.file.mimetype,
        avatarName: req.file.originalname,
        bornDate: new Date(req.body.year + '-' + req.body.month + '-' + req.body.day)
    }).then(async newUser => {
        fs.unlinkSync(req.file.path);
        if(newUser) {
            user = newUser;
            // console.log("User account created: " + newUser);
            const profile = await UserProfile.create({userAccount: newUser._id});
            // console.log("User Profile Document created" + profile);
            const updateUser = await UserAccount.findByIdAndUpdate( newUser._id,
                                    {userProfile: profile._id})
            // console.log(updateUser)
            // Find the stored image in MongoDB, then save it in '/static/assets/tmp' folder
            // UserAccount.findById(user, (err, findOutImage) => {
            //   if (err) throw err;
            //   try{
            //     fs.writeFileSync(__basedir + '/images/tmp-jsa-header.png', findOutImage.userAvatar);
            //     console.log("Stored an image 'tmp-jsa-header.png' in '/static/assets/tmp' folder.");
            //   }catch(e){
            //     console.log(e);
            //   }
            // });
        }
    }).catch(err => {
        fs.unlinkSync(req.file.path);
        error = err;
    })
    if(error) {
        return next(error);
    }
    console.log('User created');
    await sendTokenResponse(user, 201, res)
});

const updateUser = asyncHandler(async (req, res, next) => {
    // console.log(req);

    // Make sure user is the owner
    if(req.params.id !== req.userId.toString() && req.role !== 'admin') {
        return next(new ErrorResponse(
                        `User ${req.userId} is not authorized to update this user: ${req.params.id}`, 401)
        );
    }
    const user = await UserAccount.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }

    await upload(req, res);
    // console.log(req.files);
    const userAccFields = ["firstName", "lastName", "email", "password", "avatar"];
    let userAccountData = {}
    let userProfileData = {}
    // await uploadImage(req, res);

    if(req.files){
        Object.values(req.files).forEach(file => {
            image = fs.readFileSync(file[0].path);
            if((userAccFields.indexOf(file[0].originalname) > -1)
                || userAccFields.indexOf(file[0].fieldname) > -1)
            {
                userAccountData['avatar'] = image;
                userAccountData['avatarType'] =  file[0].mimetype;
                userAccountData['avatarName'] = file[0].originalname;
            } else {
                // userProfileData[file[0].originalname] = image;
                userProfileData['coverPhoto'] = image;
            }
        });
    }
    Object.keys(req.body).map((value, idx) => {
        if(userAccFields.indexOf(value) > -1) {
            userAccountData[value] = req.body[value];
        } else {
            userProfileData[value] = req.body[value];
        }
    })
    console.log(userAccountData);
    console.log(userProfileData);
    if(Object.keys(userAccountData).length > 0) {
        await UserAccount.findByIdAndUpdate( req.params.id, userAccountData)
        .then(userAccountBeforeUpdat => {
            console.log(userAccountBeforeUpdat)
        })
    }
    if(Object.keys(userProfileData).length > 0) {
        await UserProfile.findOneAndUpdate({userAccount: req.params.id}, userProfileData)
        .then(userProfileBeforeUpdate => {
            console.log(userProfileBeforeUpdate)
        })
    }
    if(req.files) {
        Object.values(req.files).forEach(file => fs.unlinkSync( __basedir + '\\images\\' + file[0].filename));
    }
    res.status(201).json({
        success: true,
        message: 'Fields have been updated!'
    })
});

const deleteUser = asyncHandler(async(req, res, next) => {
    // await UserAccount.findByIdAndDelete(req.params.id);
    const user = await UserAccount.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`A user was not found with id of ${req.params.id}`, 404)
        );
    }

    
    if(req.params.id !== req.userId.toString() && req.role !== 'admin') {
        return next(
        new ErrorResponse(
            `User ${req.userId} is not authorized to delete this user: ${req.params.id}`, 401)
        );
    }
    user.remove();
    res.status(200).json({success: true, data: {}});
})

module.exports = {getUsers, searchUserByName, getUser, getMe, createUser, updateUser, deleteUser}
