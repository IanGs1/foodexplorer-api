const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { sign } = require("jsonwebtoken");
const authConfig = require("../config/auth");

const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, reply) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();
    if (!user) {
      throw new AppError("Email ou senha inválidos!", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos!", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
      subject: String(user.id),
    });

    return reply.status(201).json({
      user, 
      token,
    })
  }
}

module.exports = SessionsController;