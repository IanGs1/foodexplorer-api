const { Router } = require("express");
const DishesController = require("../controllers/dishes-controller");

const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const ensureAdmin = require("../middlewares/ensure-admin");

const multer = require("multer");
const uploadConfig = require("../config/upload-config");

const dishRoutes = Router();
const dishesController = new DishesController();

const upload = multer(uploadConfig.multerConfig);

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", ensureAdmin, dishesController.create);
dishRoutes.get("/:dishId", dishesController.show);
dishRoutes.get("/", dishesController.index);
dishRoutes.put("/:dishId", ensureAdmin, dishesController.update);
dishRoutes.delete("/:dishId", ensureAdmin, ensureAuthenticated, dishesController.delete);

dishRoutes.patch("/upload/:dishId", ensureAdmin, upload.single("photo"), dishesController.updatePhoto);

module.exports = dishRoutes;