const {uploadImages} = require("../middleware/upload");

const newPost = async (req, res) => {
    try {
        
        await(uploadImages(req, res))   
        .catch((error) => {
             console.log(error);
        });

        if (req.files === undefined) {
            return res.status(400).send({ message: "Select a file!" });
        }
        var fs = require('fs');
        var imageData = fs.readFileSync(req.files.path);
        // req.body.firstName
        // userId: {
        //     type: mongoose.Types.ObjectId, 
        //     ref: "UserAccount",
        //     required: true,
        // },
        // title: {
        //     type: String,
        //     required: true,
        //     trim: true,
        //     minlength: 3
        // },
        // aboveText: String,
        // belowText: String,
        // imagesIds: [{
        //     type: mongoose.Types.ObjectId, 
        //     ref: "ImagesPost",
        // }],
        // commentsIds: [{
        //     type: mongoose.Types.ObjectId, 
        //     ref: "CommentsPosts",
        // }],
        // reactionsUsers:[{
        //     reaction:{
        //         type: String, 
        //     },
        //     userId: {
        //         type: mongoose.Types.Mixed,
        //         ref: "UserAccount",
        //     }
        // }],
        // privacy: {
        //     type: String,
        //     required: true,
        // },
        // privacyFriends: [{
        //     type: mongoose.Types.ObjectId, 
        //     ref: "UserAccount",
        //     required: true,
        // }],
        // metadata: {
        //     reactionsNo: Number,
        //     commentsNo: Number
        // }


        const files = req.files
        console.log(req.files);
        // if (!files) {
        //     const error = new Error('Please choose files')
        //     error.httpStatusCode = 400
        //     return res.status(400).send({ message: "Please upload a file!" });
        // }
        res.send(files);
    } catch(error) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });   
    }
}

module.exports = {
    newPost
}