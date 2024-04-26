const knex = require("../database/knex");
const AppError = require("../utils/AppError");

// Using an object as an enumerable
const acceptedCategories = {
  Lanche: "Lanche",
  Refeição: "Refeição",
  Salada: "Salada",
};

class CreateDishUseCase {
  async execute({ name, description, category, ingredients, price }) {
    if (!Array.isArray(ingredients)) {
      throw new AppError("Ingredients must be an array!", 400);
    };
    
    // Verifiying if the category is on the "Category Enum"
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    if (!acceptedCategories[capitalizedCategory]) {
      throw new AppError("Category must be or 'Lanche', or 'Refeição', or 'Salada'", 400);
    };
    
    // const dishAlreadyExists = await knex("dishes").where({ name }).first();
    // if (dishAlreadyExists) {
    //   throw new AppError("Dish already exists!", 400);
    // };

    const [dish] = await knex("dishes").insert({
      name,
      description,
      price,
      category: capitalizedCategory,
    }).returning("*");

    console.log(dish);

    ingredients.forEach(async (ingredient) => {
      await knex("ingredients").insert({
        name: ingredient,
        dish_id: dish.id,
      });
    });

    return {
      ...dish,
      ingredients,
    };
  };
};

module.exports = CreateDishUseCase;