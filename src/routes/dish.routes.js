const { Router } = require("express");

const DishesController = require("../controllers/DishesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureUserAdmin = require("../middlewares/ensureUserAdmin");

const dishRoutes = Router();
const dishesController = new DishesController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", ensureUserAdmin, dishesController.create);
dishRoutes.get("/", dishesController.index);
dishRoutes.get("/:dishId", dishesController.show);
dishRoutes.put("/:dishId", ensureUserAdmin, dishesController.update);

module.exports = dishRoutes