const express = require("express");
const router = express.Router();
const { User } = require("../../models/");

// Get all users
router.get("/", (req, res) => {
    User.findAll()
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

// Get one user
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
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

// Create a user
router.post("/", async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            password: req.body.password,
        };
        const user = await User.create(newUser);
        res.json({ status: "success", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating record!",
            error: error,
        });
    }
});

// Update a user
router.put("/:id", async (req, res) => {
    try {
        const updateUser = {
            name: req.body.name,
            // password: req.body.password,
        };
        let user = await User.update(updateUser, {
            where: {
                id: req.params.id,
            },
        });
        res.json({ status: "success", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const deleteUser = await User.destroy({ where: { id: req.params.id } });
        return res.json({ status: "success", deleteUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
});

module.exports = router;
