require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongodb");

const courseRoutes = require("./routes/courseRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/enrollments", courseRoutes);

app.get("/", (req, res) => {
  res.send("Enrollment Service Running");
});

app.listen(process.env.PORT, () => {
  console.log("Enrollment Service Running on 3003");
});
