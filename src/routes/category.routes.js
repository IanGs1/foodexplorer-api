const { Router } = require("express");

const CategoriesController = require("../controllers/CategoriesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const categoryRoutes = Router();
const categoriesController = new CategoriesController();

categoryRoutes.use(ensureAuthenticated);
categoryRoutes.get("/", categoriesController.index);

module.exports = categoryRoutes