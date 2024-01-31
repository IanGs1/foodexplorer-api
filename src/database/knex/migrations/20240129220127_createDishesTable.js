exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");

  table.text("name");
  table.float("price");
  table.text("description");  

  table.text("photo").default(null);

  table.integer("category_id");
  table.foreign("category_id").references("id").inTable("categories");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");