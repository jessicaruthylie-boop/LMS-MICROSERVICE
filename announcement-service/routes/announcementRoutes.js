const express = require("express");

const router = express.Router();

const {
  getAnnouncements,
  addAnnouncement,
} = require("../controllers/announcementController");

router.get("/", getAnnouncements);

router.post("/", addAnnouncement);

module.exports = router;
