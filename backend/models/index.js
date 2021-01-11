// Exporting one object containing all models
module.exports = {
    UserAccount: require("./userAccount.model"),
    UserProfile: require("./userProfile.model"),
    UserAuths: require("./userAuths.model"),
    Post: require("./post.model"),
    ImagesPost: require("./imagesPosts.model"),
    CommentsPosts: require("./commentsPosts.model"),
}