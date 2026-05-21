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

const PORT = process.env.PORT || 3002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Course Service running on ${PORT}`);
});
