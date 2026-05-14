const announcementModel = require("../models/announcementModel");

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementModel.getAllAnnouncements();

    res.json(announcements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addAnnouncement = async (req, res) => {
  try {
    const { judul, isi, tipe, mahasiswa_id, course_id } = req.body;

    const announcement = await announcementModel.createAnnouncement(
      judul,
      isi,
      tipe,
      mahasiswa_id,
      course_id,
    );

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnnouncements,
  addAnnouncement,
};
