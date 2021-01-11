const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsPosts = new Schema ({
    postId: {
        type: mongoose.Types.ObjectId, 
        ref: "Post",
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId, 
        ref: "UserAccount",
        required: true,
    },
    commentOrder: {
        type: Number,
    },
    comment: {
        type: String,
    },
    commentImg: {
        type: Buffer,
    },
    commentImgType: {
        type: String,
    },
});

const CommentsPosts = mongoose.model("CommentsPosts", commentsPosts);
module.exports = CommentsPosts