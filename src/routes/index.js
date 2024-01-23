const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./session.routes");

const appRoutes = Router();

appRoutes.use("/users" ,userRoutes);
appRoutes.use("/sessions", sessionRoutes);

module.exports = appRoutes;