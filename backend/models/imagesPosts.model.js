const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imagesPosts = new Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId, 
            ref: "Post",
            required: true,
        },
        imageOrder: {
            type: Number,
        },
        postImg: {
            type: Buffer,
        },
        postImgType: {
            type: String,
        },
    }
);

const ImagesPosts = mongoose.model('ImagesPost', imagesPosts);
module.exports = ImagesPosts;