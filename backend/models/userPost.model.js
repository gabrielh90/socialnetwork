const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema(
    {
        userAccount: {
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
            required: [true, 'Please insert an user Id']
        },
        title: {
            type: String,
            required: [true, 'Please insert a title'],
            trim: true,
            minlength: 3,
        },
        aboveText: {type: String, default: undefined},
        belowText: {type: String, default: undefined},
        images: [{
            type: String, 
            default: undefined
        }],
        // commentsIds: [{
        //     type: mongoose.Types.ObjectId, 
        //     ref: "CommentsPosts",
        // }],

        usersReactions:[{
            userAccount: {
                type: mongoose.Types.ObjectId,
                ref: "UserAccount",
            },
            reaction:{
                type: String,
                enum: ['like', 'favorite', 'satisfied', 'shocked', 'dissatisfied']
            },
        }],
        privacy: {
            type: String,
            default: 'public'
        },
        privacyFriends: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        metadata: {
            likeNo: {type: Number, default: 0},
            favoriteNo: {type: Number, default: 0},
            satisfiedNo: {type: Number, default: 0},
            shockedNo: {type: Number, default: 0},
            dissatisfiedNo: {type: Number, default: 0},
            reactionsNo: {type: Number, default: 0},
            commentsNo: {type: Number, default: 0},
            sharesNo: {type: Number, default: 0}
        }
    },
    {
        timestamps: true,    
    }
);

const userPost = mongoose.model('UserPost', postSchema);

module.exports = userPost;