require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const examRoutes = require("./routes/examRoutes");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());
app.use("/exams", examRoutes);
app.use(express.json());

let channel;

mongoose
  .connect("mongodb://mongodb:27017/lms_exam_db")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Exam Service Running");
});

app.use("/exams", examRoutes);

app.post("/submit-exam", async (req, res) => {
  const data = {
    student: req.body.student,

    exam: req.body.exam,

    status: "completed",
  };

  channel.sendToQueue("exam_queue", Buffer.from(JSON.stringify(data)));

  res.json({
    message: "Exam submitted",

    data,
  });
});

const startServer = async () => {
  channel = await connectRabbitMQ();

  app.listen(process.env.PORT, () => {
    console.log("Exam Service Running on 3004");
  });
};

startServer();
