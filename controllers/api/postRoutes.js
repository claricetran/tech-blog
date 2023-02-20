const express = require("express");
const router = express.Router();
const { Post } = require("../../models/");

// Get all Posts
router.get("/", (req, res) => {
    Post.findAll()
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

// Get one Post
router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id)
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

// Create a Post
router.post("/", async (req, res) => {
    try {
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id, //Change to session.UserId
        };
        const Post = await Post.create(newPost);
        res.json({ status: "success", Post });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating record!",
            error: error,
        });
    }
});

// Update a Post
router.put("/:id", async (req, res) => {
    try {
        const updatePost = {
            title: req.body.title,
            content: req.body.content,
        };
        let Post = await Post.update(updatePost, {
            where: {
                id: req.params.id,
            },
        });
        res.json({ status: "success", Post });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await Post.destroy({ where: { id: req.params.id } });
        return res.json({ status: "success", deletePost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

module.exports = router;
