const mongoose = require('mongoose');


const userAuthsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
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
        }
    },
    {
        timestamps: true,    
    }
)

const userAuths = mongoose.model('UserAuths', userAuthsSchema);
module.exports = userAuths;
