/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.string("id").primary().defaultTo(knex.fn.uuid());

    table.string("name");
    table.string("password");
    table.string("email");

    table.enum("role", ["user", "admin"]).defaultTo("user");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
