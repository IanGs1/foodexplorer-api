const { Router } = require("express");
const DishesController = require("../controllers/dishes-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const ensureAdmin = require("../middlewares/ensure-admin");

const dishRoutes = Router();
const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated);
dishRoutes.use(ensureAdmin);

dishRoutes.post("/", dishesController.create);
dishRoutes.get("/:dishId", dishesController.show);

module.exports = dishRoutes;