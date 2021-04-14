const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
    {
        userAccount: {
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
            required: true,
        },
        coverPhoto: {
            type: Buffer,
            default: null,
        },
        shortDescription: {
            type: String,
            trim: true,
        },
        homeTown: {
            type: String,
            trim: true,
        },
        workplace: {
            type: String,
            trim: true,
        },
        school: {
            type: String,
            trim: true,
        },
        relationship: {
            type: String,
            trim: true,
        },
        friends: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        friendRequestSent: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        friendRequestReceived: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        friendRequestAccepted: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        privacy: {
            type: String,
        },
        privacyFriendsArray:  [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
        }],
        posts: [{
            type: mongoose.Types.ObjectId, 
            ref: "Posts",
        }],
        postsIdReplied: [{
            type: mongoose.Types.ObjectId, 
            ref: "Posts",
        }],
        groups: [{
            type: mongoose.Types.ObjectId, 
            ref: "Group",
        }],
        fieldsUpdated: {
            type: Boolean,
            default: false
        }
    }
)

const userProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = userProfile;