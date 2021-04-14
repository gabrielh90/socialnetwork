const {uploadImages} = require("../middleware/upload");
const {ErrorResponse} = require('./../utils');
const asyncHandler = require('./../middleware/async');
const {UserPost} = require('../models/');
const fs = require('fs');


const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await UserPost.find({userAccount: req.userId});
    if(posts.length <= 0) {
        return next(new ErrorResponse(`You have no post `, 404));
    }
    
    if( posts[0].privacy !== "public" && (!req.userId || posts[0].userAccount.toString() !== req.userId.toString() && req.role !== 'admin')) {
        return next(
        new ErrorResponse(
            `User ${req.userId} is not authorized to access this post: ${req.params.id}`, 401)
        );
    }

    const result = posts.map((post) => {
        let images = post.images.map(image => {
            return baseUrl + '/api/v1/images/' + image;
        })
        return {title: post.title,
            aboveText: post.aboveText, 
            belowText:post.belowText, 
            metadata:post.metadata,
            usersReactions: post.usersReactions,
            createdAt: post.createdAt,
            images}
    });


    res.status(200).json({success: true, data: result});
});

const getPost = asyncHandler(async(req, res, next) => {
    const post = await UserPost.findById(req.params.id);
    if(!post) {
        return next(
            new ErrorResponse(`A post was not found with id of ${req.params.id}`, 404)
        );
    }
    
    if( post.privacy !== "public" && (!req.userId || post.userAccount.toString() !== req.userId.toString() && req.role !== 'admin')) {
        return next(
        new ErrorResponse(
            `User ${req.userId} is not authorized to access this post: ${req.params.id}`, 401)
        );
    }
    let images = post.images.map(image => {
        console.log(image);
        return baseUrl + '/api/v1/images/' + image;
    });
    const result = {title: post.title, 
                aboveText: post.aboveText, 
                belowText:post.belowText, 
                metadata:post.metadata, 
                usersReactions: post.usersReactions,
                createdAt: createdAt,
                images
            };

    res.status(200).json({success: true, data: result});
});

const createPost = asyncHandler(async (req, res, next) => {
    try {
        await(uploadImages(req, res));
        const {_id, title, aboveText, belowText} = req.body;
        console.log(_id + " " + req.userId)
        const images = req.files.map(file => (file.filename));
        await UserPost.create({
            _id: _id,
            userAccount: req.userId, 
            title, 
            aboveText, 
            belowText, 
            images
        });

        res.status(201).json({
            success: true,
            data: {message: 'The post has been created'}
        })
    } catch(error) {
        console.log(error)
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        next(error);   
    }
});

const updatePost = asyncHandler(async(req, res, next) => {
    try {
        const post = await UserPost.findById(req.params.id);
        if(!post) {
            return next(
                new ErrorResponse(`A post was not found with id of ${req.params.id}`, 404)
            );
        }
        
        // if(post.userAccount.toString() !== req.userId.toString() && req.role !== 'admin') {
        //     return next(
        //     new ErrorResponse(
        //         `User ${req.userId} is not authorized to update this post: ${req.params.id}`, 401)
        //     );
        // }
        await(uploadImages(req, res));
        const {title, aboveText, belowText, reaction, comment, share} = req.body;
        let updateFields = {title: title, 
            aboveText: aboveText, 
            belowText: belowText,
            metadata: post.metadata
        };
        if(req.files.length > 0) {
            post.images.forEach(image => {
                if(fs.existsSync(__basedir + '\\images\\' + image)) {
                    fs.unlinkSync( __basedir + '\\images\\' + image);
                } 
            });
            const images = req.files.map(file => (file.filename));
            updateFields['images'] = images;
        }
        const reactions = ['like', 'favorite', 'satisfied', 'shocked', 'dissatisfied'];

        if(reactions.indexOf(reaction) >= 0) {
            updateFields['$addToSet'] = {usersReactions: {reaction, userAccount: req.userId}};
            updateFields['metadata'][reaction+'No'] = post['metadata'][reaction+'No'] + 1;
            updateFields['metadata']['reactionsNo'] = post['metadata']['reactionsNo'] + 1;

        } else if(reaction == 'remove') {
            updateFields['$pull'] = {usersReactions: {reaction, userAccount: req.userId}};
            updateFields['metadata'][reaction+'No'] = post['metadata'][reaction+'No'] - 1;
            updateFields['metadata']['reactionsNo'] = post['metadata']['reactionsNo'] - 1;
        }
        if (comment == 'add'){
            updateFields['metadata']['commentsNo'] = post['metadata']['commentsNo'] + 1;
        }else if (share == 'remove') {
            updateFields['metadata']['commentsNo'] = post['metadata']['commentsNo'] - 1;
        }
        if (share == 'add'){
            updateFields['metadata']['sharesNo'] = post['metadata']['sharesNo'] + 1;
        }else if (share == 'remove') {
            updateFields['metadata']['sharesNo'] = post['metadata']['sharesNo'] - 1;
        }

        await UserPost.findByIdAndUpdate(req.params.id, updateFields);


        res.status(201).json({
            success: true,
            data: {message: 'The post has been updated'}
        });
    } catch(error) {
        console.log(error);
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        next(error);   
    }
});

const deletePost = asyncHandler(async(req, res, next) => {
    const post = await UserPost.findById(req.params.id);
    // const post = await UserPost.find({userAccount: req.params.id});
    if(!post) {
        return next(
            new ErrorResponse(`A post was not found with id of ${req.params.id}`, 404)
          );
    }
    
    if(post.userAccount.toString() !== req.userId.toString() && req.role !== 'admin') {
        return next( new ErrorResponse(
                `User ${req.userId} is not authorized to delete this post: ${req.params.id}`, 401)
        );
    }
    post.images.forEach(image => fs.unlinkSync( __basedir + '/images/' + image));
    post.remove();
    res.status(200).json({success: true, data: {message: 'The post has been deleted'}});
});

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
