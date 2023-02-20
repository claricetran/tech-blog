const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User - Post Association
User.hasMany(Post);
Post.belongsTo(User);

// User - Comment Association
User.hasMany(Comment);
Comment.belongsTo(User);

// Post - Comment Association
Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
