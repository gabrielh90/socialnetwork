const mongoose = require('mongoose');


const userAuthSchema = new mongoose.Schema(
    {
        userAccount: {
            type: mongoose.Types.ObjectId,
            ref: "UserAccount",
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        role: {
            type: String,
            enum: ['user'],
            default: 'user',
        },
        token: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        logoutTime: {
            type: Date,
            required: false,
            trim: true,
            minlength: 3
        },
        deviceName: {
            type: String
        }
    },
    {
        timestamps: true,    
    }
)

const userAuth = mongoose.model('UserAuth', userAuthSchema);
module.exports = userAuth;
