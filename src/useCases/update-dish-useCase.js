const knex = require("../database/knex");
const AppError = require("../utils/AppError");

// Using an object as an enumerable
const acceptedCategories = {
  Lanche: "Lanche",
  Refeição: "Refeição",
  Salada: "Salada",
};

class UpdateDishUseCase {
  async execute({ name, category, ingredients, price, description }, dishId) {    
    if (category) {
      // Verifiying if the category is on the "Category Enum"
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      if (!acceptedCategories[capitalizedCategory]) {
          throw new AppError("Category must be or 'Lanche', or 'Refeição', or 'Salada'", 400);
      };
    };

    const dish = await knex("dishes").where({ id: dishId }).first();
    if (!dish) {
      throw new AppError("Please, insert a valid DishId", 400);
    }; 

    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;

    const updatedDish = await knex("dishes").where({ id: dishId }).update(dish);

    if (ingredients) {
      if (!Array.isArray(ingredients)) {
        throw new AppError("Ingredients must be an array!", 400);
      };

      await knex("ingredients").where({ dish_id: dishId }).delete();
      ingredients.forEach(async (ingredient) => {
        await knex("ingredients").insert({
          name: ingredient,
          dish_id: dishId,
        });
      });
    };

    return {
      ...updatedDish,
      ingredients,
    };
  };
};

module.exports = UpdateDishUseCase;