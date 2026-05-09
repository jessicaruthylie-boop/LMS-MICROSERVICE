require("dotenv").config();

const express = require("express");

const cors = require("cors");

const examRoutes = require("./routes/examRoutes");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/exams", examRoutes);

let channel;

app.get("/", (req, res) => {
  res.send("Exam Service Running");
});

const startServer = async () => {
  channel = await connectRabbitMQ();

  app.listen(
    process.env.PORT,

    () => {
      console.log("Exam Service Running on 3004");
    },
  );
};

startServer();
