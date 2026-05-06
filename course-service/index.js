require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongodb");

const courseRoutes = require("./routes/courseRoutes");

const app = express();

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
