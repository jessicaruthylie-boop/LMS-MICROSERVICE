const pool = require("../config/db");

const getAdmins = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM admins");

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAdmins,
};
