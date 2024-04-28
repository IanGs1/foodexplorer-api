const knex = require("../database/knex");

class findDishByIngredientsUseCase {
  async execute(ingredients, dishName) {
    let dishes;

    // Writing a nested function so I can use return inside a nested If statement;
    async function findDishes(ingredients, dishName) {
      if (ingredients && dishName) {
        const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim()).map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1));
    
        // Checking if there is an Dish with this DishName or with this ingredients;
        const thereIsADishWithThisName = await knex("dishes").whereLike("name", `%${dishName}%`);
        if (thereIsADishWithThisName.length < 1) {
          return await knex("ingredients")
          .innerJoin("dishes", "ingredients.dish_id", "dishes.id")
          .whereIn("ingredients.name", filterIngredients)
          .select([
            "dishes.id",
            "dishes.name",
            "dishes.photo",
            "dishes.description",
            "dishes.price",
          ])
          .orderBy("dishes.name");
        };
    
        const thereIsADishWithThisIngredients = await knex("ingredients")
          .innerJoin("dishes", "ingredients.dish_id", "dishes.id")
          .whereIn("ingredients.name", filterIngredients);
        if (thereIsADishWithThisIngredients.length < 1) {        
          return await knex("dishes")
          .whereLike("dishes.name", `%${dishName}%`)
          .select([
            "dishes.id",
            "dishes.name",
            "dishes.photo",
            "dishes.description",
            "dishes.price",
          ])
          .orderBy("dishes.name");
        }
    
        // END OF THE CHECKING PART  
    
        return await knex("ingredients")
          .innerJoin("dishes", "ingredients.dish_id", "dishes.id")
          .whereLike("dishes.name", `%${dishName}%`)
          .whereIn("ingredients.name", filterIngredients)
          .select([
            "dishes.id",
            "dishes.name",
            "dishes.photo",
            "dishes.description",
            "dishes.price",
          ])
          .orderBy("dishes.name");
      } 
      else {
        return await knex("dishes");
      };
    };

    dishes = await findDishes(ingredients, dishName);

    const allIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = allIngredients.filter(ingredient => dish.id === ingredient.dish_id);

      return {
        ...dish,
        ingredients: dishIngredients.map(ingredient => ingredient.name),
      };
    });

    return dishesWithIngredients;
  };
};

module.exports = findDishByIngredientsUseCase;