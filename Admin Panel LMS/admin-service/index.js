require("dotenv").config();

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admins", adminRoutes);

app.get("/", (req, res) => {
  res.send("Admin Service Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Admin Service running on port ${PORT}`);
});
