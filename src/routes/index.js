const { Router } = require("express");

const userRoutes = require("./user.routes");
const dishRoutes = require("./dish.routes");

const appRoutes = Router();

appRoutes.use("/users", userRoutes);
appRoutes.use("/dishes", dishRoutes);

module.exports = appRoutes;