const Exam = require("../models/Exam");

// GET ALL EXAMS
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET EXAM BY ID
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SUBMIT EXAM
const submitExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    const studentAnswers = req.body.answers;

    let score = 0;

    exam.questions.forEach((question, index) => {
      if (studentAnswers[index] === question.correctAnswer) {
        score += 20;
      }
    });

    res.status(200).json({
      message: "Exam submitted successfully",
      score: score,
      totalQuestions: exam.questions.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getExams,
  getExamById,
  submitExam,
};
