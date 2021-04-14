const {uploadImage} = require("../middleware/upload");
const {ErrorResponse} = require('../utils');
const asyncHandler = require('../middleware/async');

const {getRandomToken} = require('../utils');
const {UserReview} = require('../models');
const fs = require('fs');


const getReviews = asyncHandler(async (req, res, next) => {
    const reviews = await UserReview.find({userPost: req.params.postId});
    if(reviews.length <= 0) {
        return next(new ErrorResponse(`You have no review `, 404));
    }

    // if(reviews[0].userAccount.toString() !== req.userId.toString() && req.role !== 'admin') {
    //     return next(
    //     new ErrorResponse(
    //         `User ${req.userId} is not authorized to access this review: ${req.params.reviewId}`, 401)
    //     );
    // }

    const result = reviews.map((review) => {
        let image = review.image ? baseUrl + '/api/v1/images/' + review.image : undefined;
        return {
                userPost: review.userPost,
                userAccount: review.userAccount,
                comment: review.comment,
                image }
    });
    

    res.status(200).json({success: true, data: result});
});
const createReview = asyncHandler(async (req, res, next) => {
    try {
        await(uploadImage(req, res));
        await UserReview.create({
            _id: req.body._id,
            userPost: req.params.postId,
            userAccount: req.userId, 
            comment: req.body.comment,
            image: req.file ? req.file.filename : undefined
        });

        res.status(201).json({
            success: true,
            data: {message: 'The review has been created'}
        })
    } catch(error) {
        // console.log(error)
        if(req.file){
            fs.unlinkSync(req.file.path);
        }
        next(error);   
    }
});
const getReview = asyncHandler(async(req, res, next) => {
    const review = await UserReview.findById(req.params.reviewId);
    if(!review) {
        return next(
            new ErrorResponse(`A review was not found with id of ${req.params.reviewId}`, 404)
        );
    }
    if(review.userAccount.toString() !== req.userId.toString() && req.role !== 'admin') {
        return next(
        new ErrorResponse(
            `User ${req.userId} is not authorized to access this review: ${req.params.reviewId}`, 401)
        );
    }
    let image = review.image ? baseUrl + '/api/v1/images/' + review.image : undefined;

    const result = {
                userPost: review.userPost,
                userAccount: review.userAccount,
                comment: review.comment,
                image 
            };

    res.status(200).json({success: true, data: result});
});
const updateReview = asyncHandler(async(req, res, next) => {
    try {
        const review = await UserReview.findById(req.params.reviewId);
        if(!review) {
            return next(
                new ErrorResponse(`A review was not found with id of ${req.params.reviewId}`, 404)
            );
        }
        await(uploadImage(req, res));
        let updateFields = {
            comment: req.body.comment,
            image: req.file ? req.file.filename : undefined
        };
        if(req.file) {
            
            if(fs.existsSync(__basedir + '\\images\\' + review.image)) {
                fs.unlinkSync( __basedir + '\\images\\' + review.image);
            } 
        }

        await UserReview.findByIdAndUpdate(req.params.reviewId, updateFields);


        res.status(201).json({
            success: true,
            data: {message: 'The review has been updated'}
        });
    } catch(error) {
        console.log(error);
        // if(fs.existsSync(__basedir + '\\images\\' + review.image)) {
        //     fs.unlinkSync( __basedir + '\\images\\' + review.image);
        // } 
        
        next(error);   
    }
});

const deleteReview = asyncHandler(async(req, res, next) => {
    const review = await UserReview.findById(req.params.reviewId);
    // const review = await UserReview.find({userAccount: req.params.reviewId});
    if(!review) {
        return next(
            new ErrorResponse(`A review was not found with id of ${req.params.reviewId}`, 404)
        );
    }
    
    if(review.userAccount.toString() !== req.userId.toString() && req.role !== 'admin') {
        return next( new ErrorResponse(
                `User ${req.userId} is not authorized to delete this review: ${req.params.reviewId}`, 401)
        );
    }
    if(fs.existsSync(__basedir + '\\images\\' + review.image)) {
        fs.unlinkSync( __basedir + '\\images\\' + review.image)
    }
    review.remove();
    res.status(200).json({success: true, data: {message: 'The review has been deleted'}});
});

module.exports = {
    getReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview
}
