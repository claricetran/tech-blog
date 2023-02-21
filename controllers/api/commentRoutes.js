const express = require("express");
const router = express.Router();
const { Comment, User, Post } = require("../../models/");

// Get all Comments
router.get("/", (req, res) => {
    Comment.findAll()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error getting records!",
                error: error,
            });
        });
});

// Get one Comment
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error getting records!",
                error: error,
            });
        });
});

// Create a Comment
router.post("/", async (req, res) => {
    try {
        const newComment = {
            content: req.body.content,
        };
        const comment = await Comment.create(newComment);
        const user = await User.findByPk(req.session.userId);
        const post = await Post.findByPk(req.body.post_id);
        user.addComment(comment);
        post.addComment(comment);
        console.log(comment);
        res.json({ status: "success", comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating record!",
            error: error,
        });
    }
});

// Update a Comment
router.put("/:id", async (req, res) => {
    try {
        const updateComment = {
            title: req.body.title,
            content: req.body.content,
        };
        let comment = await Comment.update(updateComment, {
            where: {
                id: req.params.id,
            },
        });
        res.json({ status: "success", comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

// Delete a Comment
router.delete("/:id", async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({ where: { id: req.params.id } });
        return res.json({ status: "success", deleteComment });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

module.exports = router;
