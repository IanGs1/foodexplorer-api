const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const jwtConfig = require("../config/jwt-config");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SignInUserUseCase {
  async execute({ email, password }) {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      throw new AppError("Email/Password is invalid!", 400);
    };

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email/Password is invalid!", 400);
    };

    const token = sign({ userRole: user.role }, jwtConfig.secret, {
      subject: user.id,
      expiresIn: jwtConfig.expiresIn,
    });

    return {
      user,
      token,
    };
  };
};

module.exports = SignInUserUseCase;