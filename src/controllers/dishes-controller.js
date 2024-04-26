const CreateDishUseCase = require("../useCases/create-dish-useCase");
const FindDishByIdUseCase = require("../useCases/find-dish-by-id-useCase");
const DeleteDishUseCase = require("../useCases/delete-dish-useCase");

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

  async show(request, reply) {
    const { dishId } = request.params;

    const findDishByIdUseCase = new FindDishByIdUseCase();

    try {
      const dish = await findDishByIdUseCase.execute(dishId);

      return reply.status(200).json({
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

  async delete(request, reply) {
    const { dishId } = request.params;

    const deleteDishUseCase = new DeleteDishUseCase();

    try {
      await deleteDishUseCase.execute(dishId);

      return reply.status(204).json({});
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