const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
    {
        userId: {
            //type: mongoose.Types.ObjectId,
            type: 'String',
            required: true,
            trim: true,
            minlength: 3
        },
        userAvatar: {
            type: Buffer,
        },
        avatarType: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
    }
)

const userProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = userProfile