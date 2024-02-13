const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/DiskStorage");

class DishesPhotoController {
  async update(request, reply) {
    const { dishId } = request.params;
    const photoFilename = request.file.filename;

    const dish = await knex("dishes").where({ id: dishId }).first();
    if (!dish) {
      throw new AppError("Por favor, insira um ID válido!", 404);
    }

    const diskStorage = new DiskStorage();

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    };

    const filename = await diskStorage.saveFile(photoFilename);
    dish.photo = filename;

    await knex("dishes").where({ id: dishId }).update(dish);

    return reply.status(200).json(dish);
  }
}

module.exports = DishesPhotoController;