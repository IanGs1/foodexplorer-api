const { Router } = require("express");

const userRoutes = require("./user.routes");

const appRoutes = Router();

appRoutes.use("/users", userRoutes);

module.exports = appRoutes;