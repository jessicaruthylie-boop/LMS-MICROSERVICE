require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());

app.use(express.json());

let notifications = [];

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

app.get("/notifications", (req, res) => {
  res.json(notifications);
});

const startServer = async () => {
  const channel = await connectRabbitMQ();

  channel.consume(
    "exam_queue",

    (message) => {
      const data = JSON.parse(message.content.toString());

      const notification = {
        student: data.student,

        exam: data.exam,

        status: data.status,

        message: `${data.student} completed ${data.exam}`,

        createdAt: new Date(),
      };

      notifications.push(notification);

      console.log("New Notification:", notification);

      channel.ack(message);
    },
  );

  app.listen(
    process.env.PORT,

    () => {
      console.log("Notification Service Running on 3007");
    },
  );
};

startServer();
