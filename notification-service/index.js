require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const startServer = async () => {
  const channel = await connectRabbitMQ();

  channel.consume("exam_queue", (message) => {
    const data = JSON.parse(message.content);

    console.log("Notification Received:");
    console.log(data);

    channel.ack(message);
  });

  app.listen(process.env.PORT, () => {
    console.log("Notification Service Running on 3007");
  });
};

startServer();
