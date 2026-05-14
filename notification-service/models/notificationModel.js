const db = require("../config/db");

const getAllNotifications = async () => {
  const result = await db.query(
    "SELECT * FROM notifications ORDER BY created_at DESC",
  );

  return result.rows;
};

const createNotification = async (mahasiswa_id, title, message, type) => {
  const result = await db.query(
    `INSERT INTO notifications
    (mahasiswa_id, title, message, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [mahasiswa_id, title, message, type],
  );

  return result.rows[0];
};

module.exports = {
  getAllNotifications,
  createNotification,
};
