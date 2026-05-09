const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",

  host: "postgres",

  database: "lms_exam_db",

  password: "postgres",

  port: 5432,
});

const connectPostgres = async () => {
  while (true) {
    try {
      await pool.query("SELECT NOW()");

      console.log("PostgreSQL Connected");

      break;
    } catch (error) {
      console.log("Waiting PostgreSQL...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

connectPostgres();

module.exports = pool;
