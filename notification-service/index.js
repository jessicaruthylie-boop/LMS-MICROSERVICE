require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectRabbitMQ = require("./config/rabbitmq");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const channel = await connectRabbitMQ();

    if (!channel) {
      console.log("RabbitMQ channel not ready");
      return;
    }

    channel.consume("exam_queue", (message) => {
      const data = JSON.parse(message.content);

      console.log("Notification Received:");
      console.log(data);

      channel.ack(message);
    });

    app.get("/", (req, res) => {
      res.send("Notification Service Running");
    });

    app.listen(process.env.PORT, () => {
      console.log(`Notification Service running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
