const path = require("node:path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(".", "src", "database", "database.db"),
    },
    migrations: {
      directory: path.resolve(".", "src", "database", "knex", "migrations"),
      extension: "js",
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    useNullAsDefault: true,
  },
};
