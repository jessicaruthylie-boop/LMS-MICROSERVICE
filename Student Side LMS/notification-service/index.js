require("dotenv").config();

const express = require("express");

const cors = require("cors");

const pool = require("./config/postgres");

const { connectRabbitMQ } = require("./config/rabbitmq");

const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());

app.use(express.json());

connectRabbitMQ();

app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Notification Service Running on ${process.env.PORT}`);
});
