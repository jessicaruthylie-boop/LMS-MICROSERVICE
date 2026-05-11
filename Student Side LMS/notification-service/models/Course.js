const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
});

module.exports = mongoose.model("Course", CourseSchema);
