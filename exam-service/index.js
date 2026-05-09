require("dotenv").config();

const express = require("express");

const cors = require("cors");

const examRoutes = require("./routes/examRoutes");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/exams", examRoutes);

// =========================
// ROOT
// =========================

app.get("/", (req, res) => {
  res.send("Exam Service Running");
});

// =========================
// RABBITMQ
// =========================

let channel;

app.post(
  "/submit-exam",

  async (req, res) => {
    try {
      const data = {
        student: req.body.student,

        exam: req.body.exam,

        status: "completed",
      };

      if (channel) {
        channel.sendToQueue(
          "exam_queue",

          Buffer.from(JSON.stringify(data)),
        );
      }

      res.json({
        message: "Exam submitted",

        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  },
);

// =========================
// START SERVER
// =========================

const startServer = async () => {
  try {
    channel = await connectRabbitMQ();

    app.listen(
      process.env.PORT,

      () => {
        console.log("Exam Service Running on 3004");
      },
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
