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

  async index(request, reply) {
    const { name, ingredients } = request.query;

    let dishes;
    if (ingredients) {
      const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());

      dishes = await knex("dishes")
      .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
      .whereIn("ingredients.name", filterIngredients)
      .whereLike("dishes.name", `%${name}%`)

    } else if (name) {
      dishes = await knex("dishes")
      .whereLike("name", `%${name}%`)
      .orderBy("name");
    } else {
      dishes = await knex("dishes").orderBy("name");
    }

    const categories = await knex("categories");
    const allIngredients = await knex("ingredients");

    const dishesWithCategoriesAndIngredients = categories.map(category => {
      const dishesWithCategories = dishes.filter(dish => dish.category_id === category.id);

      if (dishesWithCategories.length === 0) {
        return;
      }

      const dishesWithIngredients = dishesWithCategories.map(dish => {
        const filteredIngredients = allIngredients.filter(ingredient => ingredient.dish_id === dish.id);

        return {
          ...dish,
          ingredients: filteredIngredients,
        }
      })

      return {
        category: category.name,
        dishes: dishesWithIngredients,
      }
    });

    // Using here the Array.prototype.reduce method to exclude null values in the dishes array
    const filteredDishesWithCategoriesAndIngredients = dishesWithCategoriesAndIngredients.reduce((acc, dish) => dish ? [...acc, dish] : acc, [])

    return reply.status(200).json(filteredDishesWithCategoriesAndIngredients);
  }
}

module.exports = DishesController;