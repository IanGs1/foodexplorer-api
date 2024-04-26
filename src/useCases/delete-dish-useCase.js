const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DeleteDishUseCase {
  async execute(dishId) {
    const dish = await knex("dishes").where({ id: dishId }).first();

    if (!dish) {
      throw new AppError("Please, insert a valid Dish ID", 400);
    };

    await knex("dishes").where({ id: dishId }).delete();

    return {};
  };
};

module.exports = DeleteDishUseCase;