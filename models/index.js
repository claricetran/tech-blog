const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User - Post Association
Post.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Post);

// User - Comment Association
Comment.belongsTo(User, {
    onDelete: "CASCADE",
});
User.hasMany(Comment);

// Post - Comment Association
Comment.belongsTo(Post, {
    onDelete: "CASCADE",
});
Post.hasMany(Comment);

module.exports = { User, Post, Comment };
