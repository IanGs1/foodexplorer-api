const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FindDishById {
  async execute(dishId) {
    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Please, insert a valid Dish ID", 400);
    };

    return dish;
  };
};

module.exports = FindDishById;