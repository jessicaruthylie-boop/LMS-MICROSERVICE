const express = require("express");

const router = express.Router();

const pool = require("../config/postgres");

// GET ALL EXAMS
router.get("/", async (req, res) => {
  try {
    const exams = await pool.query("SELECT * FROM exams");

    res.json(exams.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// GET QUESTIONS BY EXAM ID
router.get(
  "/:id/questions",

  async (req, res) => {
    try {
      const examId = req.params.id;

      const questions = await pool.query(
        `
          SELECT *

          FROM questions

          WHERE exam_id = $1
          `,

        [examId],
      );

      res.json(questions.rows);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  },
);

// SUBMIT EXAM

router.post(
  "/submit",

  async (req, res) => {
    try {
      const {
        student_name,

        exam_id,

        answers,
      } = req.body;

      const questions = await pool.query(
        `
          SELECT *

          FROM questions

          WHERE exam_id = $1
          `,

        [exam_id],
      );

      let score = 0;

      questions.rows.forEach((question) => {
        const userAnswer = answers[question.id];

        if (userAnswer === question.correct_answer) {
          score += 20;
        }
      });

      const status = score >= 70 ? "PASSED" : "FAILED";

      await pool.query(
        `
        INSERT INTO scores
        (
          student_name,
          exam_id,
          score,
          status
        )

        VALUES
        ($1,$2,$3,$4)
        `,

        [student_name, exam_id, score, status],
      );

      res.json({
        message: "Exam submitted successfully",

        student_name,

        exam_id,

        score,

        status,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  },
);

module.exports = router;
