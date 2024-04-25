const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { hash } = require("bcryptjs");

class createUserUseCase {
  async execute({ name, email, password }) {
    const emailAlreadyInUse = await knex("users").where({ email }).first();
    if (emailAlreadyInUse) {
      throw new AppError("Email already in Use!", 400);
    };

    const passwordHash = await hash(password, 7);

    const user = await knex("users").insert({
      name,
      email,
      password
    }).returning("*");

    return user;
  };
};

module.exports = createUserUseCase;