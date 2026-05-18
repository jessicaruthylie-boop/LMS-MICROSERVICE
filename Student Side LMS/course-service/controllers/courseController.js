const Course = require("../models/Course");

const { getChannel } = require("../config/rabbitmq");

// GET ALL COURSES
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE COURSE
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    // RabbitMQ Event
    const channel = getChannel();

    if (channel) {
      const queue = "new_course_queue";

      await channel.assertQueue(queue);

      channel.sendToQueue(
        queue,
        Buffer.from(
          JSON.stringify({
            event: "NEW_COURSE",
            title: course.title,
            category: course.category,
            instructor: course.instructor,
          }),
        ),
      );

      console.log("New Course Event Sent");
    }

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET COURSE BY ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
