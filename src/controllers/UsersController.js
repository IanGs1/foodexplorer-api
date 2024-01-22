const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { hash } = require("bcryptjs");

class UsersController {
  async create(request, reply) {
    const { name,  email, password } = request.body;

    const emailAlreadyInUse = await knex("users").where({ email }).first();
    if (emailAlreadyInUse) {
      throw new AppError("Esse Email já está em uso!", 400);
    }

    const hashedPassword = await hash(password, 8);

    const [userId] = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    if (userId == 1) {
      await knex("users").where({ email }).update({
        admin: true,
      })
    }

    return reply.status(201).json({
      id: userId,
      name,
      email,
      password: hashedPassword,
    })
  }
}

module.exports = UsersController;