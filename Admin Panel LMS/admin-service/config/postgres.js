const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",

  host: "localhost",

  database: "lms_admin_db",

  password: "postgres",

  port: 5433,
});

module.exports = pool;
