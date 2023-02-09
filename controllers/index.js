const router = require("express").Router();

const apiRoutes = require("./api");
const frontRoutes = require("./frontRoutes");

router.use("/", frontRoutes);
router.use("/api", apiRoutes);

module.exports = router;
