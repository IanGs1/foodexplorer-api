const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureUserAdmin(request, reply, next) {
  const userId = request.user.id;

  const user = await knex("users").where({ id: userId }).first();

  if (user.isAdmin === 1) {
    next()
  } else {
    throw new AppError("Para acessar essa rota, é necessário ser ADMIN!", 401);
  }
}

module.exports = ensureUserAdmin;