const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        include: [User],
    }).then((postData) => {
        const hbsPosts = postData.map((post) => post.toJSON());

        for (let i = 0; i < hbsPosts.length; i++) {
            let date = new Date(hbsPosts[i].createdAt);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
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
    Post.findAll({
        where: {
            user_id: req.session.userId,
        },
        include: [
            {
                model: User,
                attributee: ["name"],
            },
        ],
    }).then((posts) => {
        const hbsPosts = posts.map((post) => post.toJSON());
        for (let i = 0; i < hbsPosts.length; i++) {
            let date = new Date(hbsPosts[i].createdAt);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            hbsPosts[i].createdAt = `${month}/${day}/${year}`;
        }

        res.render("dashboard", {
            userPosts: hbsPosts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    });
});

// post page
router.get("/post/:id", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    const post = await Post.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["name"],
            },
        ],
    });
    const hbsPost = post.toJSON();

    // Convert created at to mm/dd/yyyy
    let date = new Date(hbsPost.createdAt);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    hbsPost.createdAt = `${month}/${day}/${year}`;

    // find all comments on post
    const comments = await Comment.findAll({
        where: {
            PostId: req.params.id,
        },
        include: [
            {
                model: User,
                attributes: ["name"],
            },
        ],
    });

    //convert all comments to JSON
    const hbsComments = comments.map((comment) => comment.toJSON());

    if (hbsComments.length > 0) {
        for (let i = 0; i < hbsComments.length; i++) {
            let cDate = new Date(hbsComments[i].createdAt);
            let cDay = cDate.getDate();
            let cMonth = cDate.getMonth() + 1;
            let cYear = cDate.getFullYear();
            hbsComments[i].createdAt = `${cMonth}/${cDay}/${cYear}`;
        }
    }

    console.log(hbsPost);
    console.log(hbsComments);
    res.render("post", {
        post: hbsPost,
        comments: hbsComments,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
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
    res.redirect("/");
});

module.exports = router;
