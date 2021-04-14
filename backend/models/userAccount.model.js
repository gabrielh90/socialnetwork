const mongoose = require('mongoose');
const {arrayBufferToBase64}= require('../utils');
const bcrypt = require('bcryptjs');

const UserAccount = new mongoose.Schema(
    {
        userProfile: {
            type: mongoose.Types.ObjectId,
            ref: "UserProfile",
        },
        firstName: {
            type: String,
            required: [true, 'Please add a first name'],
            trim: true,
            minlength: 1,
            maxlength: [50, 'First name can not be more then 50 characters'],
        },
        lastName: {
            type: String,
            // required: [true, 'Please add last name'],
            trim: true,
            minlength: 1,
            maxlength: [50, 'Last name can not be more then 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: [true, 'There is an account with email'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
            trim: true,
            minlength: 5,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            trim: true,
            minlength: 3,
            select: false
        },
        role: {
            type: String,
            enum: ['user'],
            default: 'user',
            select: false
        },
        avatar: {
            type: Buffer,
            default: null,
        },
        avatarName: {
            type: String,
            default: 'no-photo.jpg',
        },
        avatarType: {
            type: String,
            default: '',
        },
        resetPasswordExpire: {
            type: String,
            trim: true,
        },
        resetPasswordToken: {
            type: Date,
            creatAt: {
                type: Date,
                default: Date.now
            }
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

//Encrypt password using bcrypt
UserAccount.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
// UserAccount.methods.getSignedJwtToken = function(){
//     return this.getSignedJwtToken.sign({id: this._id}, process.env.JWT_SECRET,{
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };

// Match user entered password to hashed password in database
UserAccount.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

UserAccount.post('findOne', (doc) => {
    
})


// Cascade delete profile when user account is deleted
UserAccount.pre('remove', async function(next) {
    console.log(`User with id: ${this._id} is being removed`);
    await this.model('UserProfile').deleteMany({userAccount: this._id})
    await this.model('UserAuth').deleteMany({userAccount: this._id})
    next();
});

// Generate and hash the password reset token
UserAccount.methods.getResetPasswordToken = function() {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //10 min
    return resetToken;
}
module.exports = mongoose.model('UserAccount', UserAccount);;
