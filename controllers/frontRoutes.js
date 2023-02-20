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
        console.log(hbsPosts);
        res.render("home", {
            allPosts: hbsPosts,
        });
    });
});
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.render("login");
});
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.render("signup");
});
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
        res.render("profile", hbsData);
    });
});

module.exports = router;
