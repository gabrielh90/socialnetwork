const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userProfileId: {
            type: mongoose.Types.ObjectId, 
            ref: "UserProfile",
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
        avatarName: {
            type: String,
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
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },    
    }
);

const UserAccount = mongoose.model('UserAccount', userSchema);

module.exports = UserAccount;
