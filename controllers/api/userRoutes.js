const express = require("express");
const router = express.Router();
const { User } = require("../../models/");
const bcrypt = require("bcrypt");

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
        const existing = await User.findOne({
            where: {
                name: req.body.username,
            },
        });

        if (existing) {
            return res.status(409).json({
                message: "Username already exists",
            });
        }

        const newUser = {
            name: req.body.username,
            password: req.body.password,
        };

        const user = await User.create(newUser);

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = user.id;
            req.session.name = user.name;
            console.log("req.session.save ~ req.session.cookie", req.session.cookie);
            return res.status(200).json(newUser);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating record!",
            error: error,
        });
    }
});

//Confirm user exists and return their session
router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({
            where: {
                name: req.body.username,
            },
        });
        if (!user) {
            res.status(400).json({ message: "Invalid login. Please try again." });
            return;
        }

        const dataMatches = bcrypt.compareSync(req.body.password, user.password);

        if (!dataMatches) {
            res.status(400).json({ message: "Invalid login. Please try again." });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = user.id;
            req.session.name = user.name;
            console.log(req.session.userId);
            console.log("req.session.save ~ req.session.cookie", req.session.cookie);
            res.status(200).json({ user: user, message: "You are now logged in!" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Invalid login. Please try again.",
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
