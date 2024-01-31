const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, reply) {
    const { name, category, ingredients, price, description } = request.body;

    const dishAlreadyExists = await knex("dishes").where({ name }).first();
    if (dishAlreadyExists) {
      throw new AppError("Esse prato já existe!", 400)
    }

    let category_id;

    const categoryAlreadyExists = await knex("categories").where({ name: category }).first();
    categoryAlreadyExists ? category_id = categoryAlreadyExists.id : [category_id] = await knex("categories").insert({ name: category });

    console.log(category_id);

    const [dish_id] = await knex("dishes").insert({
      name,
      price,
      description,
      category_id,
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
      category_id,
    })
  }
}

module.exports = DishesController;