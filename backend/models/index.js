// Exporting one object containing all models
module.exports = {
    UserAccount: require("./userAccount.model"),
    UserProfile: require("./userProfile.model"),
    UserAuth: require("./userAuth.model"),
    UserPost: require("./userPost.model"),
    // ImagesPost: require("./imagesPosts.model"),
    UserReview: require("./userReview.model")
}