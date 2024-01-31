const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureUserAdmin = require("../middlewares/ensureUserAdmin");

const dishRoutes = Router();
const dishesController = new DishesController();

dishRoutes.post("/", ensureAuthenticated, ensureUserAdmin, dishesController.create);

module.exports = dishRoutes