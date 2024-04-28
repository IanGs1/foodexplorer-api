const CreateDishUseCase = require("../useCases/create-dish-useCase");
const FindDishByIdUseCase = require("../useCases/find-dish-by-id-useCase");
const FindDishByIngredientsUseCase = require("../useCases/find-dish-by-ingredients-useCase");
const UpdateDishUseCase = require("../useCases/update-dish-useCase");
const DeleteDishUseCase = require("../useCases/delete-dish-useCase");

const UploadPhotoDishUseCase = require("../useCases/upload-photo-dish-useCase");

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

  async index(request, reply) {
    const { name: dishName, ingredients } = request.query;

    const findDishByIngredientsUseCase = new FindDishByIngredientsUseCase();

    try {
      const dishes = await findDishByIngredientsUseCase.execute(ingredients, dishName);

      return reply.status(200).json(dishes);
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

  async update(request, reply) {
    const { name, description, price, ingredients, category } = request.body;
    const { dishId } = request.params;

    const updateDishUseCase = new UpdateDishUseCase();

    try {
      const response = await updateDishUseCase.execute({ name, description, category, price, ingredients }, dishId);

      return reply.status(201).json(response);
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

  async updatePhoto(request, reply) {
    const { dishId } = request.params;
    const fileName = request.file.filename;

    const uploadPhotoDishUseCase = new UploadPhotoDishUseCase();

    try {
      const response = await uploadPhotoDishUseCase.execute(fileName, dishId);

      return reply.status(200).json({
        response,
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