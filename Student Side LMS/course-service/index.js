require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongodb");

const courseRoutes = require("./routes/courseRoutes");
const { connectRabbitMQ } = require("./config/rabbitmq");

const app = express();
connectRabbitMQ();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Course Service Running");
});

app.listen(process.env.PORT, () => {
  console.log("Course Service Running on 3002");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Admin service running on port ${PORT}`);
});
