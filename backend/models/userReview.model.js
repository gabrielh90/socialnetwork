const mongoose = require("mongoose");


const userReviewSchema = new mongoose.Schema ({
    userPost: {
        type: mongoose.Types.ObjectId, 
        ref: "UserPost",
        required: [true, 'Please add a Post Id']
    },
    userAccount: {
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
    image: {
        type: String,
        default: null
    },
    commentImgType: {
        type: String,
    },
});

const userReview = mongoose.model("UserReview", userReviewSchema);
module.exports = userReview;