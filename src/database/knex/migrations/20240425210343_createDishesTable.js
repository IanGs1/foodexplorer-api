/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("dishes", table => {
    table.string("id").primary().defaultTo(knex.fn.uuid());

    table.string("name");
    table.string("description");
    table.decimal("price");

    table.enum("category", ["Lanche", "Refeição", "Salada"]);

    table.string("photo").defaultTo(null);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("dishes");
};
