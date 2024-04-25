const CreateUserUseCase = require("../useCases/create-user-useCase");

const AppError = require("../utils/AppError");

class UsersController {
  async create(request, reply) {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      const user = await createUserUseCase.execute({ name, email, password });

      return reply.status(201).json({
        user,
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

module.exports = UsersController;