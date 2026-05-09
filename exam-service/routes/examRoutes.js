const express = require("express");

const router = express.Router();

const Exam = require("../models/Exam");

router.get("/", async (req, res) => {
  const exams = await Exam.find();

  res.json(exams);
});

module.exports = router;
