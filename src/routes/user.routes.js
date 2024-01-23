const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post("/", ensureAuthenticated, usersController.create);

module.exports = userRoutes