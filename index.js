const express = require("express");
const app = express();
const session = require("express-session");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const path = require("path");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001;

const { User, Post, Comment } = require("./models");

// two hour session
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(allRoutes);

app.get("/*", (req, res) => {
    res.send("Oops we couldn't find what you're looking for!");
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
