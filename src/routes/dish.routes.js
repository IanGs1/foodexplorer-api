const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const DishesPhotoController = require("../controllers/DishesPhotoController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureUserAdmin = require("../middlewares/ensureUserAdmin");

const multer = require("multer");
const { MULTER } = require("../config/upload");

const dishRoutes = Router();
const dishesController = new DishesController();

const dishesPhotoController = new DishesPhotoController();
const upload = multer(MULTER);

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", ensureUserAdmin, dishesController.create);
dishRoutes.get("/", dishesController.index);
dishRoutes.get("/:dishId", dishesController.show);
dishRoutes.put("/:dishId", ensureUserAdmin, dishesController.update);

dishRoutes.patch("/:dishId", ensureUserAdmin, upload.single("photo"), dishesPhotoController.update);

module.exports = dishRoutes