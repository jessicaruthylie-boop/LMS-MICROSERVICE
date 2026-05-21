const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getCourses,
};
