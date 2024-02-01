const knex = require("../database/knex");

class CategoriesController {
  async index(request, reply) {
    const categories = await knex("categories");

    return reply.status(200).json(categories);
  }
};

module.exports = CategoriesController;