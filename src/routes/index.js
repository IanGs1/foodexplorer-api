const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./session.routes");
const dishRoutes = require("./dish.routes");
const categoryRoutes = require("./category.routes");

const appRoutes = Router();

appRoutes.use("/users" ,userRoutes);
appRoutes.use("/sessions", sessionRoutes);
appRoutes.use("/dishes", dishRoutes);
appRoutes.use("/categories", categoryRoutes);

module.exports = appRoutes;