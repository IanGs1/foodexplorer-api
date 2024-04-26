const { Router } = require("express");
const DishesController = require("../controllers/dishes-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const dishRoutes = Router();
const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", dishesController.create);

module.exports = dishRoutes;