const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
router.use("/api/comments", commentRoutes);

module.exports = router;
