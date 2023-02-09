const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

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
	store: new SequilizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(allRoutes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
	});
});
