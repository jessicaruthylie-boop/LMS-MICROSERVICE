require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());
app.use(express.json());

let channel;

app.get("/", (req, res) => {
  res.send("Exam Service Running");
});

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
