const { Router } = require("express");
const DishesController = require("../controllers/dishes-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const ensureAdmin = require("../middlewares/ensure-admin");

const dishRoutes = Router();
const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", ensureAdmin, dishesController.create);
dishRoutes.get("/:dishId", dishesController.show);
dishRoutes.get("/", dishesController.index);
dishRoutes.put("/:dishId", ensureAdmin, dishesController.update);
dishRoutes.delete("/:dishId", ensureAdmin, ensureAuthenticated, dishesController.delete);

module.exports = dishRoutes;