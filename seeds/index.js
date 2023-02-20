const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const seed = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(
        [
            {
                name: "Glados",
                password: "cakeattheend",
            },
            {
                name: "Plant",
                password: "seedtheseed",
            },
            {
                name: "Unicorn",
                password: "rainbows",
            },
            {
                name: "Prefill",
                password: "password",
            },
        ],
        {
            individualHooks: true,
            returning: true,
        }
    );

    const posts = await Post.bulkCreate([
        {
            title: "Why MVC is so important",
            content:
                "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layerr for application logic.",
            UserId: 1,
        },
        {
            title: "Authentication vs. Authorization",
            content:
                "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
            UserId: 1,
        },
        {
            title: "Object-Relational Mapping",
            content: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
            UserId: 2,
        },
        {
            title: "For loops are faster than ForEach loops",
            content: " For loops are faster in performance than for each functions. Break statements can't be used in forEach loops either.",
            UserId: 3,
        },
    ]);

    const comments = await Comment.bulkCreate([
        {
            content: "For loops for the win!",
            PostId: 4,
            UserId: 2,
        },
        {
            content: "I didn't like ORMs at first, but they really grew on me.",
            PostId: 3,
            UserId: 3,
        },
        {
            content: "It sounds like they go pretty hand in hand in most cases.",
            PostId: 2,
            UserId: 4,
        },
        {
            content: "I still use for each loops where I can.",
            PostId: 4,
            UserId: 4,
        },
    ]);
    process.exit(1);
};

seed();
