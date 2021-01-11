const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            trim: true,
            minlength: 3
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
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        userAvatar: {
            type: Buffer,
        },
        avatarType: {
            type: String,
        },
        bornDate: {
            type: Date,
            required: false,
            trim: true,
            minlength: 3
        }
    }
)

const userProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = userProfile;