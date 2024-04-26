const knex = require("../database/knex");
const AppError = require("../utils/AppError");

// Trying to use enumerables in Javascript 
const acceptedCategories = {
  Lanche: "Lanche",
  Refeição: "Refeição",
  Salada: "Salada",
};

class CreateDishUseCase {
  async execute({ name, description, price, category, ingredients, price }) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    if (!acceptedCategories[capitalizedCategory]) {
      throw new AppError("Category must be or 'Lanche', or 'Refeição', or 'Salada'");
    };
    
    const dishAlreadyExists = await knex("dishes").where({ name }).first();
    if (dishAlreadyExists) {
      throw new AppError("Dish already exists!", 400);
    };

    const dish = await knex("dishes").insert({
      name,
      description,
      price,
      capitalizedCategory,
    }).returning("*");

    if (!Array.isArray(ingredients)) {
      throw new AppError("Ingredients must be an array!");
    };

    ingredients.forEach(async (ingredient) => {
      await knex("ingredients").insert({
        name: ingredient,
      });
    });

    return {
      ...dish,
      ingredients,
    };
  };
};

module.exports = CreateDishUseCase;