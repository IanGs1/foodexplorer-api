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

      console.log(filterIngredients);

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

  async show(request, reply) {
    const { dishId } = request.params;

    const dish = await knex("dishes").where({ id: dishId }).first();
    if (!dish) {
      throw new AppError("Por favor, insira um ID válido!", 404);
    }

    const [category] = await knex("categories").where({ id: dishId });
    const ingredients = await knex("ingredients").where({ dish_id: dishId });

    return reply.status(200).json({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      photo: dish.photo,
      category: category.AppErrorname,
      ingredients,
      created_at: dish.created_at,
      updated_at: dish.updated_at,
    })
  }

  async update(request, reply) {
    const { name, price, description, category, ingredients } = request.body;
    const { dishId } = request.params;

    const dish = await knex("dishes").where({ id: dishId }).first();
    if (!dish) {
      throw new AppError("Por favor, insira um ID válido!", 404);
    }

    dish.name = name ?? dish.name
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description

    if (category) {
      const categoryAlreadyExists = await knex("categories").where({ name: category }).first();
      if (!categoryAlreadyExists) {
        const [categoryId] = await knex("categories").insert({
          name: category,
        })
  
        dish.category_id = categoryId;
      } else {
        dish.category_id === categoryAlreadyExists.id ? dish.category_id = dish.category_id : dish.category_id = categoryAlreadyExists.id;
      }
    }

    if (ingredients) {
      const previousIngredients = await knex("ingredients").where({ dish_id: dishId });
      previousIngredients.map(async (ingredient) => {
        await knex("ingredients").where({ id: ingredient.id }).delete();
      })
  
      ingredients.map(async (ingredient) => {
        await knex("ingredients").insert({
          name: ingredient,
          dish_id: dishId,
        })
      })
    }

    await knex("dishes").where({ id: dishId }).update(dish);

    return reply.status(200).json({ dish });
  }
}

module.exports = DishesController;