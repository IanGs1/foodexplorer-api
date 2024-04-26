const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FindDishById {
  async execute(dishId) {
    const dish = await knex("dishes").where({ id: dishId }).first();

    if (!dish) {
      throw new AppError("Please, insert a valid Dish ID", 400);
    };

    const completeIngredients = await knex("ingredients").where({ dish_id: dishId });
    const ingredients = completeIngredients.map(ingredient => ingredient.name);

    return {
      ...dish,
      ingredients,
    };
  };
};

module.exports = FindDishById;