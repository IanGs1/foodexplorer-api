const CreateDishUseCase = require("../useCases/create-dish-useCase");

const AppError = require("../utils/AppError");

class DishesController {
  async create(request, reply) {
    const { name, description, price, ingredients, category } = request.body;

    const createDishUseCase = new CreateDishUseCase();

    try {
      const dish = await createDishUseCase.execute({ name, description, category, price, ingredients });

      return reply.status(201).json({
        dish,
      });
    }
    catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).json({
          status: "Error",
          message: error.message,
        });
      };

      console.error("🚨 Error on: ", error);

      return reply.status(500).send({
        status: "Error",
        message: "Internal Server Error",
      });
    };
  };
};

module.exports = DishesController;