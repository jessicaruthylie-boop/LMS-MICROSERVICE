const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "admin_db",
  password: "postgres",
  port: 5434,
});

module.exports = pool;
