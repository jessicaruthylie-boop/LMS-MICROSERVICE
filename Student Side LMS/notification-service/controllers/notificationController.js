const pool = require("../config/postgres");

const getNotifications = async (req, res) => {
  try {
    const notifications = await pool.query(
      `
      SELECT *

      FROM notifications

      ORDER BY id DESC
      `,
    );

    res.json(notifications.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
};
