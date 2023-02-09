const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
	foreignKey: "user_id",
	onDelete: "CASCASE",
});

Post.belongsTo(User, {
	foreignKey: "user_id",
});

User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Comment.belongsTo(User, {
	onDelete: "CASCADE",
});

Post.hasMany(Comment, {
	foreignKey: "post_id",
	onDelete: "CASCASE",
});

Comment.belongsTo(post, {
	foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
