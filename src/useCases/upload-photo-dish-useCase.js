const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/disk-storage");

class UploadPhotoDishUseCase {
  async execute(file, dishId) {
    const dish = await knex("dishes").where({ id: dishId }).first();
    if (!dish) {
      throw new AppError("Please, insert a valid DishId", 400);
    }; 

    const diskStorage = new DiskStorage();

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    };

    const fileName = await diskStorage.saveFile(file);
    dish.photo = fileName;

    await knex("dishes").where({ id: dishId }).update(dish);

    return dish;
  };
};

module.exports = UploadPhotoDishUseCase;