const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        include: [User],
    }).then((postData) => {
        console.log(postData);
        const hbsPosts = postData.map((post) => post.toJSON());
        console.log("==============================");

        for (let i = 0; i < hbsPosts.length; i++) {
            let date = new Date(hbsPosts[i].createdAt);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            hbsPosts[i].createdAt = `${month}/${day}/${year}`;
        }

        console.log(hbsPosts);

        res.render("homepage", {
            allPosts: hbsPosts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    });
});

//login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.render("login", {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
    });
});

//dashboard page
router.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    User.findByPk(req.session.userId, {
        include: [Post],
    }).then((userdata) => {
        console.log(userdata);
        const hbsData = userdata.toJSON();
        console.log("==============================");
        console.log(hbsData);
        res.render("dashboard", {
            userPosts: hbsData,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    });
});

router.get("/post/:id", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    Post.findByPk(req.params.id, {
        include: [User, Comment],
    }).then((postData) => {
        console.log(postData);
    });
});

//redirect to homepage on logout
router.get("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
