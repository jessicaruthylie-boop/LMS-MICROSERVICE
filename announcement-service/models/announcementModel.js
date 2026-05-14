const db = require("../config/db");

const getAllAnnouncements = async () => {
  const result = await db.query(
    "SELECT * FROM pengumuman ORDER BY created_at DESC",
  );
  return result.rows;
};

const createAnnouncement = async (
  judul,
  isi,
  tipe,
  mahasiswa_id,
  course_id,
) => {
  const result = await db.query(
    `INSERT INTO pengumuman 
    (judul, isi, tipe, mahasiswa_id, course_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [judul, isi, tipe, mahasiswa_id, course_id],
  );

  return result.rows[0];
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
};
