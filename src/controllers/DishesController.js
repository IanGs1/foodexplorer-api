const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, reply) {
    const { name, category, ingredients, price, description } = request.body;

    const dishAlreadyExists = await knex("dishes").where({ name }).first();
    if (dishAlreadyExists) {
      throw new AppError("Esse prato já existe!", 400)
    }

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
    })

    ingredients.map(async (ingredient) => {
      await knex("ingredients").insert({
        name: ingredient,
        dish_id,
      })
    })

    return reply.status(201).json({
      id: dish_id,
      name,
      category,
      ingredients,
      price,
      description,
    })
  }
}

module.exports = DishesController;