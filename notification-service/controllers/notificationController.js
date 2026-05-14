const notificationModel = require("../models/notificationModel");

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.getAllNotifications();

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addNotification = async (req, res) => {
  try {
    const { mahasiswa_id, title, message, type } = req.body;

    const notification = await notificationModel.createNotification(
      mahasiswa_id,
      title,
      message,
      type,
    );

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  addNotification,
};
