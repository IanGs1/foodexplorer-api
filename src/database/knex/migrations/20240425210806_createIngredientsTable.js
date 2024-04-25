/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("ingredients", table => {
    table.string("id").primary().defaultTo(knex.fn.uuid());

    table.string("name");

    table.string("dish_id");
    table.foreign("dish_id").references("id").inTable("dishes");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("ingredients");
};
