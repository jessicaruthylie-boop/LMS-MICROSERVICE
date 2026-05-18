const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",

  host: "localhost",

  database: "lms_exam_db",

  password: "postgres",

  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
