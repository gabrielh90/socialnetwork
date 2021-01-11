const mongoose = require('mongoose');

const userRecoverAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
        minlength: 3
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    valid: {
        type: Boolean,
        required: true,
    },
})

const userRecoverAccount = mongoose.model('UserRecoverAccount', userRecoverAccountSchema);

module.exports = userRecoverAccount;