const asyncHandler = require('./../middleware/async');
const ErrorResponse = require('./../utils/errorResponse');
const {UserProfile, UserAccount} = require('./../models');
const {arrayBufferToBase64}= require('../utils');

const getFriends = asyncHandler(async (req, res, next) => {
    //Pagination
    const model = UserProfile;
    const reqQuery = {...req.query};
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const userId = req.params.id || req.userId;

    let total = await model.aggregate([
                                {$match:   {userAccount: userId}},
                                {$project: {
                                    _id: 0,
                                    numberOfFriends: { $cond: { if: { $isArray: "$friends" }, then: { $size: "$friends" }, else: "NA"} }
                                }}]);
    // console.log(total);
    total = total.length > 1 ? total[0].numberOfFriends : 0;
    let friendsIds = await model.find({userAccount: userId})//,{_id: 0,"friends": {$slice: [startIndex, limit]}})
                                .slice('friends', startIndex, limit)
                                .select('-_id friends');
                                // .populate('friends')
                                // .select({users: {_id: 1, avatar: 1, avatarType: 1, firstName: 1, lastName: 1, email: 1}});
    let query = UserAccount.find({'_id': { $in: friendsIds[0].friends} })
                                    .select({_id: 1, avatar: 1, avatarType: 1, firstName: 1, lastName: 1, email: 1});

    // let query = model
    //                 .aggregate([
    //                     {$match:   {userAccount: userId}},
    //                     {$project: {_id: 0, slicefriends: {$slice: ["$friends", startIndex, limit]}}},
    //                     {$lookup: {
    //                         from: UserAccount.collection.name,
    //                         localField: 'slicefriends',
    //                          foreignField: '_id',
    //                          // let: {userId: UserAccount._id},
    //                          // pipeline : [
    //                          //     { $match: { $expr: { $in: [ "$userId", "$friends" ] } }, },
    //                          //     // { $match: { $expr: { $eq: [ "$userId", "$friends" ] } }, },
    //                          //     // { $project : { _id: 1, username:1 } }
    //                          // ],
    //                         as: 'users'
    //                     }},
    //                     {$project: {users: {_id: 1, avatar: 1, avatarType: 1, firstName: 1, lastName: 1, email: 1}}},
    //                 ]);

    // Execute query
    const results = await query;
    if (!results) {
        return next(new ErrorResponse(`You have no friends`, 404));
    }
    // Pagination results
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    const users = results.map(user => {
        const avatar = user['avatar'] ? arrayBufferToBase64(user['avatar'].buffer, user['avatarType']) : undefined
        return {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar,
        }
    })

    // console.log(users);
    res.status(200).json({
        success: true,
        pagination,
        data: users
    });
});
const removeFriend = asyncHandler(async(req, res, next) => {
    const receiver = await UserProfile.findOneAndUpdate(
        {userAccount: req.params.id},
        {$pull: {friends: req.userId}});
    if(!receiver) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }
    const sender = await UserProfile
        .where({userAccount: req.userId})
        .updateOne({$pull: {friends: req.params.id}});
    // console.log(sender);
    res.status(201).json({
        success: true,
        data: {message: 'Friend removed'}
    });
});
const getSentFriendRequests = asyncHandler(async (req, res, next) => {
    //Pagination
    const model = UserProfile;
    const reqQuery = {...req.query};
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const userId = req.params.id || req.userId;
    let total = await model.aggregate([
                                {$match:   {userAccount: userId}},
                                {$project: {
                                    _id: 0,
                                    numberOfFriends: { $cond: { if: { $isArray: "$friendRequestSent" }, then: { $size: "$friendRequestSent" }, else: 0} }
                                }}]);

    total = total.length > 1 ? total[0].numberOfFriends : 0;
    let results = await model.find({userAccount: userId})//,{_id: 0,"friends": {$slice: [startIndex, limit]}})
                                .slice('friendRequestSent', startIndex, limit)
                                .select('-_id friendRequestSent')
                                .populate({path: 'friendRequestSent',
                                           select: '_id avatar avatarType firstName lastName email'});

    // if (!results) {
    //     return next(new ErrorResponse(`You have no friend request sent`, 404));
    // }
    // Pagination results
    const pagination = {};
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }
    const users = results[0].friendRequestSent.map(user => {
        const avatar = user['avatar'] ? arrayBufferToBase64(user['avatar'].buffer, user['avatarType']) : undefined
        return {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar,
        }
    });

    // console.log(users);
    res.status(200).json({
        success: true,
        pagination,
        data: users
    });
});
const sendFriendRequest = asyncHandler(async (req, res, next) => {
    const receiver = await UserProfile.findOneAndUpdate(
        {userAccount: req.params.id},
        {$addToSet: {friendRequestReceived: req.userId},
        fieldsUpdated: true
        });
    if(!receiver) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }
    const sender = await UserProfile
            .where({userAccount: req.userId})
            .updateOne({$addToSet: {friendRequestSent: req.params.id}});
    // console.log(sender);
    res.status(201).json({
        success: true,
        data: {message: 'Friend request sent'}
    });
});
const cancelFriendRequest = asyncHandler(async (req, res, next) => {
    const receiver = await UserProfile.findOneAndUpdate(
        {userAccount: req.params.id},
        {$pull: {friendRequestReceived: req.userId}})
    if(!receiver) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }
    await UserProfile.findOneAndUpdate(
        {userAccount: req.userId},
        {$pull: {friendRequestSent: req.params.id}});
    res.status(201).json({
        success: true,
        data: {message: 'Friend request canceled'}
    });
});
const getReceivedFriendRequests = asyncHandler(async (req, res, next) => {
    //Pagination
    const model = UserProfile;
    const reqQuery = {...req.query};
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const userId = req.params.id || req.userId;
    let total = await model.aggregate([
                                {$match:   {userAccount: userId}},
                                {$project: {
                                    _id: 0,
                                    numberOfFriends: { $cond: { if: { $isArray: "$friendRequestReceived" }, then: { $size: "$friendRequestReceived" }, else: "NA"} }
                                }}]);

    total = total.length > 1 ? total[0].numberOfFriends : 0;
    let friendRequestReceivedIds = await model.find({userAccount: userId})//,{_id: 0,"friends": {$slice: [startIndex, limit]}})
                                .slice('friendRequestReceived', startIndex, limit)
                                .select('-_id friendRequestReceived');
                                // .populate({path: 'friends',
                                //            select: '_id avatar avatarType firstName lastName email'});
    let query = UserAccount.find({'_id': { $in: friendRequestReceivedIds[0].friendRequestReceived} })
                                    .select({_id: 1, avatar: 1, avatarType: 1, firstName: 1, lastName: 1, email: 1});

    // Execute query
    const results = await query;
    // if (!results) {
    //     return next(new ErrorResponse(`You have no friend request received`, 404));
    // }
    // Pagination results
    const pagination = {};
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }
    const users = results.map(user => {
        const avatar = user['avatar'] ? arrayBufferToBase64(user['avatar'].buffer, user['avatarType']) : undefined
        return {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar,
        }
    });

    // console.log(users);
    res.status(200).json({
        success: true,
        pagination,
        data: users
    });
});
const acceptFriendRequest = asyncHandler(async (req, res, next) => {
    const receiver = await UserProfile.findOneAndUpdate(
        {userAccount: req.params.id},
        {$pull: {friendRequestSent: req.userId},
         $addToSet: {friendRequestAccepted: req.userId},
         $addToSet: {friends: req.userId},
         fieldsUpdate: true});
    if(!receiver) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }
    await UserProfile.findOneAndUpdate(
        {userAccount: req.userId},
        {$pull: {friendRequestReceived: req.params.id},
         $addToSet: {friends: req.params.id}
        })
    
    res.status(201).json({
        success: true,
        data: {message: 'Friend request accepted'}
    });
});
const declineFriendRequest = asyncHandler(async (req, res, next) => {
    const receiver = await UserProfile.findOneAndUpdate(
        {userAccount: req.params.id},
        {$pull: {friendRequestSent: req.userId}})
    if(!receiver) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        );
    }
    await UserProfile.findOneAndUpdate(
        {userAccount: req.userId},
        {$pull: {friendRequestReceived: req.params.id}})
    res.status(201).json({
        success: true,
        data: {message: 'Friend request declined'}
    });
});

module.exports = {
    getFriends,
    removeFriend,
    getSentFriendRequests,
    sendFriendRequest,
    cancelFriendRequest,
    getReceivedFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
}
