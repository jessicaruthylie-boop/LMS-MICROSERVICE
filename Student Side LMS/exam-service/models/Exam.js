const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  course: String,

  title: String,

  description: String,

  totalQuestions: Number,

  passingScore: Number,

  questions: [
    {
      question: String,

      options: [String],

      correctAnswer: String,
    },
  ],
});

module.exports = mongoose.model("Exam", examSchema);
