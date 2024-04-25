const { Router } = require("express");
const UsersController = require("../controllers/users-controller");

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post("/", usersController.create);

module.exports = userRoutes;