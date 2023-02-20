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
        }
    );
};

seed();
