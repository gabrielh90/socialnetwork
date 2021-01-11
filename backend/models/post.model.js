const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema =  new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        aboveText: String,
        belowText: String,
        imagesIds: [{
            type: mongoose.Types.ObjectId, 
            ref: "ImagesPost",
        }],
        commentsIds: [{
            type: mongoose.Types.ObjectId, 
            ref: "CommentsPosts",
        }],
        reactionsUsers:[{
            reaction:{
                type: String, 
            },
            userId: {
                type: mongoose.Types.Mixed,
                ref: "UserAccount",
            }
        }],
        privacy: {
            type: String,
            required: true,
        },
        privacyFriends: [{
            type: mongoose.Types.ObjectId, 
            ref: "UserAccount",
            required: true,
        }],
        metadata: {
            reactionsNo: Number,
            commentsNo: Number
        }
    },
    {
        timestamps: true,    
    }

);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;